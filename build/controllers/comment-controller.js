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
const comment_validation_1 = __importDefault(require("../validations/comment-validation"));
const response_1 = __importDefault(require("../utils/response"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const messages_1 = __importDefault(require("../utils/messages"));
const comment_service_1 = __importDefault(require("../services/comment-service"));
const mongoose_1 = require("mongoose");
const comment_model_1 = __importDefault(require("../models/comment-model"));
const post_service_1 = __importDefault(require("../services/post-service"));
const comment_dto_1 = __importDefault(require("../dtos/comment-dto"));
class CommentController {
    constructor() {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            const { id } = req.params;
            const body = yield comment_validation_1.default.create.validateAsync(req.body);
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return next(error_handler_1.default.badRequest(messages_1.default.DB.INVALID_ID));
            const post = yield post_service_1.default.findOne({ _id: id });
            if (!post)
                return next(error_handler_1.default.notFound(messages_1.default.POST.POST_NOT_FOUND));
            const payload = {
                userId: userId,
                postId: new mongoose_1.Types.ObjectId(id),
                comment: body.comment
            };
            const data = yield comment_service_1.default.create(new comment_model_1.default(payload));
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.POST.COMMENT_SUCCESS, data: new comment_dto_1.default(data) }) : next(error_handler_1.default.serverError(messages_1.default.POST.COMMENT_FAILED));
        });
    }
}
exports.default = new CommentController;
