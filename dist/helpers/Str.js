"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHash = exports.makeHash = exports.randNumber = exports.cap = exports.isEmpty = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const isEmpty = (str) => str === "";
exports.isEmpty = isEmpty;
const cap = (str) => str == "" ? str : str.charAt(0).toUpperCase() + str.slice(1);
exports.cap = cap;
const randNumber = (from, to) => Math.floor(Math.random() * (to - from + 1) + from);
exports.randNumber = randNumber;
const makeHash = (password) => bcryptjs_1.default.hashSync(password, 10);
exports.makeHash = makeHash;
const checkHash = (password, hash) => {
    return bcryptjs_1.default.compareSync(password, hash);
};
exports.checkHash = checkHash;
