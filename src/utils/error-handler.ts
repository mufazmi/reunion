import Constants from "./constants";
import Messages from "./messages";

class ErrorHandler extends Error {

    constructor(message: string, statusCode: Number) {
        super(message)
        //@ts-ignore
        this.statusCode = statusCode
        ErrorHandler.captureStackTrace(this, this.constructor);
    }

    static notFound = (message: string = Messages.SERVER.NOT_FOUND) => new ErrorHandler(message, Constants.STATUS_CODE.NOT_FOUND);
    static forbidden = (message: string = Messages.SERVER.FORBIDDEN) => new ErrorHandler(message, Constants.STATUS_CODE.FORBIDDEN);
    static badRequest = (message: string = Messages.SERVER.BAD_REQUEST) => new ErrorHandler(message, Constants.STATUS_CODE.BAD_REQUEST);
    static serverError = (message: string = Messages.SERVER.SERVER_ERROR) => new ErrorHandler(message, Constants.STATUS_CODE.SERVER_ERROR);
    static unAuthorized = (message: string = Messages.SERVER.UNAUTORIZED_ACCESS) => new ErrorHandler(message, Constants.STATUS_CODE.UNAUTORIZED);

}

export default ErrorHandler