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
const post_validation_1 = __importDefault(require("../validations/post-validation"));
const response_1 = __importDefault(require("../utils/response"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const messages_1 = __importDefault(require("../utils/messages"));
const post_service_1 = __importDefault(require("../services/post-service"));
const post_dto_1 = __importDefault(require("../dtos/post-dto"));
const mongoose_1 = require("mongoose");
const like_model_1 = __importDefault(require("../models/like-model"));
const like_service_1 = __importDefault(require("../services/like-service"));
const comment_service_1 = __importDefault(require("../services/comment-service"));
const comment_dto_1 = __importDefault(require("../dtos/comment-dto"));
class PostController {
    constructor() {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            const body = yield post_validation_1.default.create.validateAsync(req.body);
            body.userId = id;
            const data = yield post_service_1.default.create(body);
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.POST.POST_CREATED, data: new post_dto_1.default(data) }) : next(error_handler_1.default.serverError(messages_1.default.POST.POST_CREATION_FAILED));
        });
        this.findOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return next(error_handler_1.default.badRequest(messages_1.default.DB.INVALID_ID));
            const data = yield post_service_1.default.findOne({ _id: id });
            if (!data)
                return next(error_handler_1.default.notFound(messages_1.default.POST.POST_NOT_FOUND));
            const response = new post_dto_1.default(data);
            response.likes = yield like_service_1.default.findCount({ postId: id });
            response.comments = (yield comment_service_1.default.findAll({ postId: id })).map((f) => new comment_dto_1.default(f));
            return (0, response_1.default)({ res: res, message: messages_1.default.POST.POST_FOUND, data: response });
        });
        this.findAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield post_service_1.default.findAll({});
            const postPromise = data.map((e) => __awaiter(this, void 0, void 0, function* () {
                const post = new post_dto_1.default(e);
                post.likes = yield like_service_1.default.findCount({ postId: e._id });
                post.comments = (yield comment_service_1.default.findAll({ postId: e._id })).map((f) => new comment_dto_1.default(f));
                return post;
            }));
            const response = yield Promise.all(postPromise);
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.POST.POST_FOUND, data: response }) : next(error_handler_1.default.notFound(messages_1.default.POST.POST_NOT_FOUND));
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { user } = req;
            const body = yield post_validation_1.default.update.validateAsync(req.body);
            const post = yield post_service_1.default.findOne({ _id: id, userId: user.id });
            if (!post)
                return next(error_handler_1.default.notFound(messages_1.default.POST.POST_NOT_FOUND));
            const data = yield post_service_1.default.update({ _id: id }, body);
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.POST.POST_UPDATED }) : next(error_handler_1.default.serverError(messages_1.default.POST.POST_UPDATE_FAILED));
        });
        this.destroy = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { id: userId } = req.user;
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return next(error_handler_1.default.badRequest(messages_1.default.DB.INVALID_ID));
            const data = yield post_service_1.default.deleteOne({ _id: id, userId });
            return data.deletedCount ? (0, response_1.default)({ res: res, message: messages_1.default.POST.POST_DELATED }) : next(error_handler_1.default.notFound(messages_1.default.POST.POST_DELETE_FAILED));
        });
        this.likePost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return next(error_handler_1.default.badRequest(messages_1.default.DB.INVALID_ID));
            const post = yield post_service_1.default.findOne({ _id: id, userId });
            if (!post)
                return next(error_handler_1.default.notFound(messages_1.default.POST.POST_NOT_FOUND));
            const payload = {
                userId: userId,
                postId: new mongoose_1.Types.ObjectId(id)
            };
            const isAlreadyLiked = yield like_service_1.default.findOne(payload);
            if (isAlreadyLiked)
                return next(error_handler_1.default.forbidden(messages_1.default.POST.LIKE_ALREADY));
            const data = yield like_service_1.default.create(new like_model_1.default(payload));
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.POST.LIKE_SUCCESS }) : next(error_handler_1.default.serverError(messages_1.default.POST.LIKE_FAILED));
        });
        this.unLikePost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { id: userId } = req.user;
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return next(error_handler_1.default.badRequest(messages_1.default.DB.INVALID_ID));
            const payload = {
                userId: userId,
                postId: new mongoose_1.Types.ObjectId(id)
            };
            const data = yield like_service_1.default.deleteOne(payload);
            return data.deletedCount ? (0, response_1.default)({ res: res, message: messages_1.default.POST.UNLIKE_SUCCESS }) : next(error_handler_1.default.serverError(messages_1.default.POST.UNLIKE_FAILED));
        });
        this.createComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return next(error_handler_1.default.badRequest(messages_1.default.DB.INVALID_ID));
            const post = yield post_service_1.default.findOne({ _id: id, userId });
            if (!post)
                return next(error_handler_1.default.notFound(messages_1.default.POST.POST_NOT_FOUND));
            const payload = {
                userId: userId,
                postId: new mongoose_1.Types.ObjectId(id)
            };
            const isAlreadyLiked = yield like_service_1.default.findOne(payload);
            if (isAlreadyLiked)
                return next(error_handler_1.default.forbidden(messages_1.default.POST.LIKE_ALREADY));
            const data = yield like_service_1.default.create(new like_model_1.default(payload));
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.POST.LIKE_SUCCESS }) : next(error_handler_1.default.serverError(messages_1.default.POST.LIKE_FAILED));
        });
    }
}
exports.default = new PostController;
