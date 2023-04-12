import { Request, Response, NextFunction } from "express";
import Constants from "../utils/constants";
import Messages from "../utils/messages";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    let errors:any = ''
    err.statusCode = err.statusCode || Constants.STATUS_CODE.SERVER_ERROR
    err.message = err.message || Messages.SERVER.SERVER_ERROR
    let payload = { success: false, message: err.message }
    res.status(err.statusCode).json(payload) 

}

export default errorMiddleware