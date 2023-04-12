import { Response, NextFunction } from "express"
import commentValidation from "../validations/comment-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import commentService from "../services/comment-service";
import { AuthRequest } from "../interfaces/interface";
import { Types } from "mongoose";
import CommentModel, { IComment } from "../models/comment-model";
import { IPost } from "../models/post-model";
import postService from "../services/post-service";


class CommentController {

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id: userId } = req.user;
        const { id } = req.params

        const body = await commentValidation.create.validateAsync(req.body);

        if (!Types.ObjectId.isValid(id))
            return next(ErrorHandler.badRequest(Messages.DB.INVALID_ID))

        const post: IPost | null = await postService.findOne({ _id: id });

        if (!post)
            return next(ErrorHandler.notFound(Messages.POST.POST_NOT_FOUND))

        const payload: Partial<IComment> = {
            userId: userId,
            postId: new Types.ObjectId(id),
            comment:body.comment
        }

        const data: IComment | null = await commentService.create(new CommentModel(payload));

        return data ? responseSuccess({ res: res, message: Messages.POST.COMMENT_SUCCESS }) : next(ErrorHandler.serverError(Messages.POST.COMMENT_FAILED));
    }


}

export default new CommentController