"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
// initialize Controller 
const authController = new AuthController_1.AuthController();
//initialize router
const router = (0, express_1.Router)();
router.post("/reset-password", authController.resetPassword);
router.post("/check-password-token", authController.checkResetPasswordToken);
router.post("/forget-password", authController.forgetPasswordRequest);
router.post("/register", authController.register);
router.post("/reverify", authController.reVerifyRequest);
router.post("/verify", authController.verify);
router.post("/login", authController.login);
exports.default = router;
