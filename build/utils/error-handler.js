"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("./constants"));
const messages_1 = __importDefault(require("./messages"));
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        //@ts-ignore
        this.statusCode = statusCode;
        ErrorHandler.captureStackTrace(this, this.constructor);
    }
}
ErrorHandler.notFound = (message = messages_1.default.SERVER.NOT_FOUND) => new ErrorHandler(message, constants_1.default.STATUS_CODE.NOT_FOUND);
ErrorHandler.forbidden = (message = messages_1.default.SERVER.FORBIDDEN) => new ErrorHandler(message, constants_1.default.STATUS_CODE.FORBIDDEN);
ErrorHandler.badRequest = (message = messages_1.default.SERVER.BAD_REQUEST) => new ErrorHandler(message, constants_1.default.STATUS_CODE.BAD_REQUEST);
ErrorHandler.serverError = (message = messages_1.default.SERVER.SERVER_ERROR) => new ErrorHandler(message, constants_1.default.STATUS_CODE.SERVER_ERROR);
ErrorHandler.unAuthorized = (message = messages_1.default.SERVER.UNAUTORIZED_ACCESS) => new ErrorHandler(message, constants_1.default.STATUS_CODE.UNAUTORIZED);
exports.default = ErrorHandler;
