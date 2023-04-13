import { Response, NextFunction } from "express"
import postValidation from "../validations/post-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import postService from "../services/post-service";
import PostDto from "../dtos/post-dto";
import { AuthRequest } from "../interfaces/interface";
import { IPost } from "../models/post-model";
import { Types } from "mongoose";
import LikeModel, { ILike } from "../models/like-model";
import likeService from "../services/like-service";
import commentService from "../services/comment-service";
import CommentDto from "../dtos/comment-dto";


class PostController {

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.user;
        const body: IPost = await postValidation.create.validateAsync(req.body);
        body.userId = id;
        const data = await postService.create(body);
        return data ? responseSuccess({ res: res, message: Messages.POST.POST_CREATED, data: new PostDto(data) }) : next(ErrorHandler.serverError(Messages.POST.POST_CREATION_FAILED));
    }

    findOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id))
            return next(ErrorHandler.badRequest(Messages.DB.INVALID_ID))

        const data: IPost | null = await postService.findOne({ _id: id });
        if (!data)
            return next(ErrorHandler.notFound(Messages.POST.POST_NOT_FOUND));
        const response = new PostDto(data);

        response.likes = await likeService.findCount({ postId: id });
        response.comments = (await commentService.findAll({ postId: id })).map((f) => new CommentDto(f));
        return responseSuccess({ res: res, message: Messages.POST.POST_FOUND, data: response })
    }

    findAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const data = await postService.findAll({});

        const postPromise = data.map(async (e) => {
            const post = new PostDto(e);
            post.likes = await likeService.findCount({ postId: e._id });
            post.comments = (await commentService.findAll({ postId: e._id })).map((f) => new CommentDto(f));
            return post;
        })

        const response = await Promise.all(postPromise);

        return data ? responseSuccess({ res: res, message: Messages.POST.POST_FOUND, data: response }) : next(ErrorHandler.notFound(Messages.POST.POST_NOT_FOUND));
    }

    update = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { user } = req;
        const body = await postValidation.update.validateAsync(req.body);
        const post = await postService.findOne({ _id: id, userId: user.id });
        if (!post)
            return next(ErrorHandler.notFound(Messages.POST.POST_NOT_FOUND))

        const data = await postService.update({ _id: id }, body);
        return data ? responseSuccess({ res: res, message: Messages.POST.POST_UPDATED }) : next(ErrorHandler.serverError(Messages.POST.POST_UPDATE_FAILED));
    }

    destroy = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { id: userId } = req.user;

        if (!Types.ObjectId.isValid(id))
            return next(ErrorHandler.badRequest(Messages.DB.INVALID_ID))

        const data = await postService.deleteOne({ _id: id, userId });
        return data.deletedCount ? responseSuccess({ res: res, message: Messages.POST.POST_DELATED }) : next(ErrorHandler.notFound(Messages.POST.POST_DELETE_FAILED));
    }

    likePost = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id: userId } = req.user;
        const { id } = req.params

        if (!Types.ObjectId.isValid(id))
            return next(ErrorHandler.badRequest(Messages.DB.INVALID_ID))

        const post: IPost | null = await postService.findOne({ _id: id, userId });

        if (!post)
            return next(ErrorHandler.notFound(Messages.POST.POST_NOT_FOUND))

        const payload: Partial<ILike> = {
            userId: userId,
            postId: new Types.ObjectId(id)
        }

        const isAlreadyLiked: ILike | null = await likeService.findOne(payload);

        if (isAlreadyLiked)
            return next(ErrorHandler.forbidden(Messages.POST.LIKE_ALREADY))

        const data: ILike | null = await likeService.create(new LikeModel(payload));

        return data ? responseSuccess({ res: res, message: Messages.POST.LIKE_SUCCESS }) : next(ErrorHandler.serverError(Messages.POST.LIKE_FAILED));
    }

    unLikePost = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { id: userId } = req.user;

        if (!Types.ObjectId.isValid(id))
            return next(ErrorHandler.badRequest(Messages.DB.INVALID_ID))

        const payload: Partial<ILike> = {
            userId: userId,
            postId: new Types.ObjectId(id)
        }

        const data = await likeService.deleteOne(payload);

        return data.deletedCount ? responseSuccess({ res: res, message: Messages.POST.UNLIKE_SUCCESS }) : next(ErrorHandler.serverError(Messages.POST.UNLIKE_FAILED));
    }

    createComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id: userId } = req.user;
        const { id } = req.params

        if (!Types.ObjectId.isValid(id))
            return next(ErrorHandler.badRequest(Messages.DB.INVALID_ID))

        const post: IPost | null = await postService.findOne({ _id: id, userId });

        if (!post)
            return next(ErrorHandler.notFound(Messages.POST.POST_NOT_FOUND))

        const payload: Partial<ILike> = {
            userId: userId,
            postId: new Types.ObjectId(id)
        }

        const isAlreadyLiked: ILike | null = await likeService.findOne(payload);

        if (isAlreadyLiked)
            return next(ErrorHandler.forbidden(Messages.POST.LIKE_ALREADY))

        const data: ILike | null = await likeService.create(new LikeModel(payload));

        return data ? responseSuccess({ res: res, message: Messages.POST.LIKE_SUCCESS }) : next(ErrorHandler.serverError(Messages.POST.LIKE_FAILED));
    }


}

export default new PostController