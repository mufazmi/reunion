import { Request, Response, NextFunction } from "express";
import UserDto from "../dtos/user-dto";
import { IUser } from "../models/user-model";
import tokenService from "../services/token-service";
import userService from "../services/user-service";
import ErrorHandler from "../utils/error-handler";
import Messages from "../utils/messages";
import responseSuccess from "../utils/response";
import authValidation from "../validations/auth-validation";


class AuthController {

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = await authValidation.login.validateAsync(req.body);
      const user = await userService.findOne({ email: body.email } as IUser);

      if (!user)
        return next(ErrorHandler.notFound(Messages.USER.NOT_FOUND));

      const isValidPassword = await userService.verifyPassword(body.password, user.password);

      if (!isValidPassword)
        return next(ErrorHandler.unAuthorized(Messages.AUTH.PASSWORD_INVALID));

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const { accessToken, refreshToken } = tokenService.generateToken(payload);

      res.cookie('access', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      res.cookie('refresh', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      const data = new UserDto(user);

      //@ts-ignore
      data.accessToken = accessToken;
      //@ts-ignore
      data.refreshToken = refreshToken;

      res.json({ success: true, message: Messages.AUTH.AUTH_SUCCESS, data });
    } catch (error) {
      next(error);
    }
  };


  register = async (req: Request, res: Response, next: NextFunction) => {
    const body = await authValidation.register.validateAsync(req.body);
    const data = await userService.create(body);
    if (!data) {
      return next(ErrorHandler.serverError('Failed To Create An Account'));
    }
    return data ? responseSuccess({ res: res, message: Messages.AUTH.REGISTER_SUCCESS }) : next(ErrorHandler.serverError(Messages.AUTH.REGISTER_FAILED));

  }

}

export default new AuthController;