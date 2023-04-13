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
const token_service_1 = __importDefault(require("../services/token-service"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const jsonwebtoken_1 = require("jsonwebtoken");
const messages_1 = __importDefault(require("../utils/messages"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers.authorization;
    // console.log({ authorization })
    if (!authorization)
        return next(error_handler_1.default.unAuthorized());
    const accessToken = authorization.split(' ')[1];
    // console.log({ accessToken })
    try {
        const tokenUser = token_service_1.default.verifyAccessToken(accessToken);
        // console.log({ tokenUser })
        if (!tokenUser)
            return next(error_handler_1.default.unAuthorized());
        //@ts-ignore
        req.user = tokenUser;
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.TokenExpiredError) {
            // we can try to renew the token from here if there is refresh token present in request
            return next(error_handler_1.default.unAuthorized(messages_1.default.AUTH.TOKEN_EXPIRED));
        }
        else
            return next(error_handler_1.default.unAuthorized());
    }
    return next();
});
exports.default = auth;
