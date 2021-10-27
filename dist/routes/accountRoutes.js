"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AccountController_1 = require("../controllers/AccountController");
const Authenticate_1 = require("../middlewares/Authenticate");
// initialize Controller 
const accountController = new AccountController_1.AccountController();
//initialize router
const router = (0, express_1.Router)();
router.use(Authenticate_1.Authenticate);
router.get("/profile", accountController.getProfile);
exports.default = router;
