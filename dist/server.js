"use strict";
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
const express_1 = __importDefault(require("express"));
const Database_1 = require("./config/Database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3500;
function igniteServer(PORT) {
    return __awaiter(this, void 0, void 0, function* () {
        const server = (0, express_1.default)();
        server.use(express_1.default.json());
        /**
         * @function database connection check
         * @return void
        */
        try {
            yield Database_1.connection.authenticate();
            yield Database_1.connection.sync({ force: false });
        }
        catch (error) {
            process.exit(1);
        }
        server.use("/auth", authRoutes_1.default);
        server.listen(PORT);
    });
}
igniteServer(PORT);
