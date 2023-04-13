"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const KEY_ACCESS_TOKEN = process.env.KEY_ACCESS_TOKEN || '';
const KEY_REFRESH_TOKEN = process.env.KEY_REFRESH_TOKEN || '';
class TokenService {
    constructor() {
        this.generateToken = (payload) => {
            const accessToken = jsonwebtoken_1.default.sign(payload, KEY_ACCESS_TOKEN, {
                expiresIn: '1y',
            });
            const refreshToken = jsonwebtoken_1.default.sign(payload, KEY_REFRESH_TOKEN, {
                expiresIn: '1y',
            });
            return { accessToken, refreshToken };
        };
        this.verifyAccessToken = (token) => jsonwebtoken_1.default.verify(token, KEY_ACCESS_TOKEN);
        this.verifyRefreshToken = (token) => jsonwebtoken_1.default.verify(token, KEY_REFRESH_TOKEN);
    }
}
exports.default = new TokenService();
