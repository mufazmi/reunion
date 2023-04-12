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
import { IUser } from "../models/user-model";


class UserController {

    user = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.user;
        const data : IUser | null = await userService.findOne({ _id: id });

        const followers = await userService.findCount({ toUser: id });

        const followings = await userService.findCount({ fromUser: id });

        const response = new UserDto(data!)
        
        response.followers = followers;
        response.followings = followings;

        return data ? responseSuccess({ res: res, message: Messages.USER.FOUND, data:  response}) : next(ErrorHandler.notFound(Messages.USER.FOUND));
    }

    follow = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id: userId } = req.user;
        const { id } = req.params

        if (!Types.ObjectId.isValid(id))
            return next(ErrorHandler.badRequest(Messages.DB.INVALID_ID))

        const user: IUser | null = await userService.findOne({ _id: id });

        if (!user)
            return next(ErrorHandler.notFound(Messages.USER.NOT_FOUND))

        const payload: Partial<IFollow> = {
            fromUser: userId,
            toUser: new Types.ObjectId(id)
        }

        const isAlreadyFollowed: IFollow | null = await followService.findOne(payload);

        if (id.toString() === userId.toString())
            return next(ErrorHandler.forbidden(Messages.USER.FOLLOW_SELF))

        if (isAlreadyFollowed)
            return next(ErrorHandler.forbidden(Messages.USER.FOLLOW_ALREADY))

        const data: IFollow | null = await followService.create(new FollowModel(payload));

        return data ? responseSuccess({ res: res, message: Messages.FOLLOW.FOLLOW_CREATED }) : next(ErrorHandler.serverError(Messages.FOLLOW.FOLLOW_CREATION_FAILED));
    }


    unfollow = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { id: userId } = req.user;

        if (!Types.ObjectId.isValid(id))
            return next(ErrorHandler.badRequest(Messages.DB.INVALID_ID))

        const payload: Partial<IFollow> = {
            fromUser: userId,
            toUser: new Types.ObjectId(id)
        }

        const data = await followService.deleteOne(payload);

        return data.deletedCount ? responseSuccess({ res: res, message: Messages.FOLLOW.FOLLOW_DELETED }) : next(ErrorHandler.serverError(Messages.FOLLOW.FOLLOW_DELETE_FAILED));
    }


}

export default new UserController