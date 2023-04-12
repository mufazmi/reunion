import { Request, Response, NextFunction } from 'express';
import userService from '../services/user-service';
import tokenService from '../services/token-service';
import ErrorHandler from '../utils/error-handler';
import { TokenExpiredError } from 'jsonwebtoken';
import Constants from '../utils/constants';
import Messages from '../utils/messages';

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { accessToken: accessTokenFromCookie, refreshToken: refreshTokenFromCookie } = req.cookies;

  try {
    const tokenUser = tokenService.verifyAccessToken(accessTokenFromCookie);
    if (!tokenUser)
      return next(ErrorHandler.unAuthorized());
      //@ts-ignore
    req.user = tokenUser;
  } catch (e) {
    if (e instanceof TokenExpiredError) {
        // we can try to renew the token from here if there is refresh token present in request

      return next(ErrorHandler.unAuthorized(Messages.AUTH.TOKEN_EXPIRED));
    } else
      return next(ErrorHandler.unAuthorized());
  }

  return next();
}


export default auth;
