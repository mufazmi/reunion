import FollowModel from '../models/follow-model';
import UserModel, { IUser } from '../models/user-model';
import bcrypt from 'bcrypt';

class UserService {
    
    create = async (data: IUser) => await UserModel.create(data);

    update = async (_id: string, data: Partial<IUser>) => await UserModel.updateOne({ _id }, data);

    findOne = async (filter: any) => await UserModel.findOne(filter);

    verifyPassword = async (password: string, hashPassword: string) => await bcrypt.compare(password, hashPassword);

}

export default new UserService;
