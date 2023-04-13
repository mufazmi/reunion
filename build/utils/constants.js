"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Constants {
}
Constants.STATUS_CODE = {
    SUCCESS: 200,
    UNAUTORIZED: 401,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
};
Constants.AUTH = {
    SALT_FACTOR: 2
};
exports.default = Constants;
