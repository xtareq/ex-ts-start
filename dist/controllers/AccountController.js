"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const helpers_1 = require("../helpers");
const Str_1 = require("../helpers/Str");
const User_1 = require("../models/User");
class AccountController {
    uploadAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = req.body;
                let isUser = yield User_1.User.findByPk(req.userId);
                if (!isUser)
                    return res.status(401).json({ message: "User not found!" });
                const checkPassword = (0, Str_1.checkHash)(body.old_password, isUser.password);
                if (!checkPassword)
                    return res.status(400).json({ message: "Incorrect old Password." });
                isUser.password = (0, Str_1.makeHash)(body.new_password);
                yield isUser.save();
                isUser.password = "";
                return res.json({
                    message: "Password Changed.",
                    user: isUser
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Something going wrong!"
                });
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isUser = yield User_1.User.findByPk(req.userId, {
                    attributes: { exclude: ['password'] }
                });
                return res.json({
                    message: "Get Profile",
                    user: isUser
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Something going wrong!"
                });
            }
        });
    }
}
__decorate([
    (0, helpers_1.Validate)(['old_password', 'new_password', 'confirm_password:match=new_password']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "changePassword", null);
exports.AccountController = AccountController;
