"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("../utils/constants"));
const messages_1 = __importDefault(require("../utils/messages"));
const errorMiddleware = (err, req, res, next) => {
    let errors = '';
    err.statusCode = err.statusCode || constants_1.default.STATUS_CODE.SERVER_ERROR;
    err.message = err.message || messages_1.default.SERVER.SERVER_ERROR;
    let payload = { success: false, message: err.message };
    res.status(err.statusCode).json(payload);
};
exports.default = errorMiddleware;
