import { IUser } from "../models/user-model";
import { Request } from "express";

export interface AuthRequest extends Request {
    user: IUser
}