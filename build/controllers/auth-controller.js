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
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
const token_service_1 = __importDefault(require("../services/token-service"));
const user_service_1 = __importDefault(require("../services/user-service"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const messages_1 = __importDefault(require("../utils/messages"));
const response_1 = __importDefault(require("../utils/response"));
const auth_validation_1 = __importDefault(require("../validations/auth-validation"));
class AuthController {
    constructor() {
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = yield auth_validation_1.default.login.validateAsync(req.body);
                const user = yield user_service_1.default.findOne({ email: body.email });
                if (!user)
                    return next(error_handler_1.default.notFound(messages_1.default.USER.NOT_FOUND));
                const isValidPassword = yield user_service_1.default.verifyPassword(body.password, user.password);
                if (!isValidPassword)
                    return next(error_handler_1.default.unAuthorized(messages_1.default.AUTH.PASSWORD_INVALID));
                const payload = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                };
                const { accessToken, refreshToken } = token_service_1.default.generateToken(payload);
                res.cookie('access', accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                });
                res.cookie('refresh', refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                });
                const data = new user_dto_1.default(user);
                //@ts-ignore
                data.accessToken = accessToken;
                //@ts-ignore
                data.refreshToken = refreshToken;
                res.json({ success: true, message: messages_1.default.AUTH.AUTH_SUCCESS, data });
            }
            catch (error) {
                next(error);
            }
        });
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = yield auth_validation_1.default.register.validateAsync(req.body);
            const data = yield user_service_1.default.create(body);
            if (!data) {
                return next(error_handler_1.default.serverError('Failed To Create An Account'));
            }
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.AUTH.REGISTER_SUCCESS }) : next(error_handler_1.default.serverError(messages_1.default.AUTH.REGISTER_FAILED));
        });
    }
}
exports.default = new AuthController;
