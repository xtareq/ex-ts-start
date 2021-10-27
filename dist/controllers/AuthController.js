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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const Str_1 = require("../helpers/Str");
const mailer_1 = require("../lib/mailer");
const User_1 = require("../models/User");
const EmailVerify_1 = require("../templates/EmailVerify");
const JWT_KEY = process.env.JWT_KEY || "sdfsdf8903)8s9df0#&)08_DSf8S_)8DF*SDF^*&S";
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                //find user by email
                const isUser = yield User_1.User.findOne({ where: { email: email } });
                //if not registered
                if (!isUser)
                    return res.status(404).json({ message: "User not Found!" });
                //is verified
                if (!isUser.verified)
                    return res.status(401).json({ message: "User not verified" });
                //check password
                if (!(0, Str_1.checkHash)(password, isUser.password))
                    return res.status(401).json({ message: "Incorrect Password" });
                //generate token 
                const token = jsonwebtoken_1.default.sign({ userId: isUser.id }, JWT_KEY, { expiresIn: 3600 });
                return res.json({
                    token: token,
                    user: isUser
                });
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Something going wrong!Please contact your provider'
                });
            }
        });
    }
    register({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let isUser = yield User_1.User.findOne({ where: { email: body.email } });
            if (isUser)
                return res.status(400).json({ message: "Email already exits!" });
            body = Object.assign(Object.assign({}, body), { password: (0, Str_1.makeHash)(body.password), verify_code: (0, Str_1.randNumber)(111111, 999999) });
            try {
                const isUser = yield User_1.User.create(body);
                const mailer = new mailer_1.Mailer("smtp");
                let template = (0, EmailVerify_1.EmailVerifyTemplate)(isUser.name, isUser.verify_code);
                let option = {
                    test: true,
                    sender: "Saxon Prime <register@saxonprime.com>",
                    receiver: isUser.name + " <" + isUser.email + ">",
                    subject: "Email Verification Code",
                    html: template
                };
                yield mailer.send(option);
                return res.json({
                    data: isUser,
                    message: "Registered Successfully"
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Something going wrong!"
                });
            }
        });
    }
    verify({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let isUser = yield User_1.User.findOne({ where: { email: body.email } });
            //if not registered
            if (!isUser)
                return res.status(404).json({ message: "User not Found!" });
            //is verified
            if (isUser.verified)
                return res.status(400).json({ message: "Already verified" });
            // check code 
            if (isUser.verify_code !== body.verify_code)
                return res.status(400).json({ message: "Invalid code!" });
            try {
                let isVerified = yield User_1.User.update({
                    verify_code: null,
                    verified: true
                }, {
                    where: {
                        email: body.email
                    }
                });
                return res.json({
                    message: 'Verified Successfully!',
                    email: body.email
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Something going wrong!',
                    email: body.email
                });
            }
        });
    }
    reVerify({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let isUser = yield User_1.User.findOne({ where: { email: body.email } });
            //if not registered
            if (!isUser)
                return res.status(404).json({ message: "User not Found!" });
            //is verified
            if (isUser.verified)
                return res.status(400).json({ message: "Already verified" });
            try {
                let isVerified = yield User_1.User.update({
                    verify_code: (0, Str_1.randNumber)(111111, 999999)
                }, {
                    where: {
                        email: body.email
                    }
                });
                return res.json({
                    message: 'Resend verify code!',
                    email: body.email
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: 'Something going wrong!',
                    email: body.email
                });
            }
        });
    }
    forgetPasswordRequest() {
        throw new Error("Method not implemented.");
    }
    forgetPassword() {
        throw new Error("Method not implemented.");
    }
}
__decorate([
    (0, helpers_1.Validate)(['email:type=email', 'password!:min=6']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, helpers_1.Validate)([
        'name',
        'email:type=email',
        'phone:pattern=^(?:\\+?88|0088)?01[15-9]\\d{8}$',
        'password',
        'confirm_password:match=password'
    ]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, helpers_1.Validate)(['email:type=email', 'verify_code']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
__decorate([
    (0, helpers_1.Validate)(['email:type=email']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reVerify", null);
exports.AuthController = AuthController;