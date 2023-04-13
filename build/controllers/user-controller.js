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
const response_1 = __importDefault(require("../utils/response"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const messages_1 = __importDefault(require("../utils/messages"));
const follow_model_1 = __importDefault(require("../models/follow-model"));
const follow_service_1 = __importDefault(require("../services/follow-service"));
const mongoose_1 = require("mongoose");
const user_service_1 = __importDefault(require("../services/user-service"));
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
class UserController {
    constructor() {
        this.user = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            const data = yield user_service_1.default.findOne({ _id: id });
            const followers = yield follow_service_1.default.findCount({ toUser: id });
            const followings = yield follow_service_1.default.findCount({ fromUser: id });
            const response = new user_dto_1.default(data);
            response.followers = followers;
            response.followings = followings;
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.USER.FOUND, data: response }) : next(error_handler_1.default.notFound(messages_1.default.USER.FOUND));
        });
        this.follow = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return next(error_handler_1.default.badRequest(messages_1.default.DB.INVALID_ID));
            const user = yield user_service_1.default.findOne({ _id: id });
            if (!user)
                return next(error_handler_1.default.notFound(messages_1.default.USER.NOT_FOUND));
            const payload = {
                fromUser: userId,
                toUser: new mongoose_1.Types.ObjectId(id)
            };
            const isAlreadyFollowed = yield follow_service_1.default.findOne(payload);
            if (id.toString() === userId.toString())
                return next(error_handler_1.default.forbidden(messages_1.default.USER.FOLLOW_SELF));
            if (isAlreadyFollowed)
                return next(error_handler_1.default.forbidden(messages_1.default.USER.FOLLOW_ALREADY));
            const data = yield follow_service_1.default.create(new follow_model_1.default(payload));
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.FOLLOW.FOLLOW_CREATED }) : next(error_handler_1.default.serverError(messages_1.default.FOLLOW.FOLLOW_CREATION_FAILED));
        });
        this.unfollow = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { id: userId } = req.user;
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return next(error_handler_1.default.badRequest(messages_1.default.DB.INVALID_ID));
            const payload = {
                fromUser: userId,
                toUser: new mongoose_1.Types.ObjectId(id)
            };
            const data = yield follow_service_1.default.deleteOne(payload);
            return data.deletedCount ? (0, response_1.default)({ res: res, message: messages_1.default.FOLLOW.FOLLOW_DELETED }) : next(error_handler_1.default.serverError(messages_1.default.FOLLOW.FOLLOW_DELETE_FAILED));
        });
    }
}
exports.default = new UserController;
