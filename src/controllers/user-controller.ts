import { Response, NextFunction } from "express"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import { AuthRequest } from "../interfaces/interface";
import FollowModel, { IFollow } from "../models/follow-model";
import followService from "../services/follow-service";
import { Types } from "mongoose";
import userService from "../services/user-service";
import UserDto from "../dtos/user-dto";


class FollowController {

    user = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.user;
        const data = await userService.findOne({ _id:id });
        return data ? responseSuccess({ res: res, message: Messages.USER.FOUND, data: new UserDto(data) }) : next(ErrorHandler.notFound(Messages.USER.FOUND));
    }

    follow = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id: userId } = req.user;
        const { id } = req.params

        if (!Types.ObjectId.isValid(id))
            return next(ErrorHandler.badRequest(Messages.DB.INVALID_ID))

        const payload: Partial<IFollow> = {
            fromUser: userId,
            toUser: new Types.ObjectId(id)
        }

        const isAlreadyFollowed = await followService.findOne(payload);

        if (id.toString() === userId.toString())
            return next(ErrorHandler.forbidden(Messages.USER.FOLLOW_SELF))

        if (isAlreadyFollowed)
            return next(ErrorHandler.forbidden(Messages.USER.FOLLOW_ALREADY))

        const data = await followService.create(new FollowModel(payload));
        console.log("Follow Data is", data);
        return data ? responseSuccess({ res: res, message: Messages.FOLLOW.FOLLOW_CREATED }) : next(ErrorHandler.serverError(Messages.FOLLOW.FOLLOW_CREATION_FAILED));
    }


    // unfollow = async (req: AuthRequest, res: Response, next: NextFunction) => {
    //     const { id } = req.params;
    //     const { user } = req;
    //     const post = await postService.findOne({ _id: id, userId: user.id });
    //     if (!post)
    //         return next(ErrorHandler.notFound(Messages.FOLLOW.FOLLOW_NOT_FOUND))

    //     const data = await postService.update({ _id: id }, body);
    //     return data ? responseSuccess({ res: res, message: Messages.FOLLOW.FOLLOW_UPDATED }) : next(ErrorHandler.serverError(Messages.FOLLOW.FOLLOW_UPDATE_FAILED));
    // }


}

export default new FollowController