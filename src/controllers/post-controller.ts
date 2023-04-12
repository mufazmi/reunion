import { Response, NextFunction } from "express"
import postValidation from "../validations/post-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import postService from "../services/post-service";
import ProductDto from "../dtos/post-dto";
import { AuthRequest } from "../interfaces/interface";


class PostController {

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const body = await postValidation.create.validateAsync(req.body);
        const data = await postService.create(body);
        console.log(data)
        return data ? responseSuccess({ res: res, message: Messages.POST.POST_CREATED }) : next(ErrorHandler.serverError(Messages.POST.POST_CREATION_FAILED));
    }

    findOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await postService.findAll({ id });
        return data ? responseSuccess({ res: res, message: Messages.POST.POST_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.POST.POST_NOT_FOUND));
    }

    findAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const data = await postService.findAll({});
        const response = data.map((e)=> new ProductDto(e));
        return data ? responseSuccess({ res: res, message: Messages.POST.POST_FOUND, data: response }) : next(ErrorHandler.notFound(Messages.POST.POST_NOT_FOUND));
    }

    update = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const {user} = req;
        const body = await postValidation.update.validateAsync(req.body);
        const post = await postService.findOne({ _id:id,userId:user.id });
        if (!post)
            return next(ErrorHandler.notFound(Messages.POST.POST_NOT_FOUND))

        const data = await postService.update({ _id:id }, body);
        return data ? responseSuccess({ res: res, message: Messages.POST.POST_UPDATED }) : next(ErrorHandler.serverError(Messages.POST.POST_UPDATE_FAILED));
    }

    destroy = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await postService.deleteOne({id});
        return data ? responseSuccess({ res: res, message: Messages.POST.POST_DELATED }) : next(ErrorHandler.notFound(Messages.POST.POST_DELETE_FAILED));
    }
}

export default new PostController