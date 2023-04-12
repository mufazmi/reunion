import FollowModel, { IFollow } from '../models/follow-model';

class FollowService {
    
    create = async (data: IFollow) => await FollowModel.create(data);

    update = async (_id: string, data: Partial<IFollow>) => await FollowModel.updateOne({ _id }, data);

    findOne = async (filter: any) => await FollowModel.findOne(filter);

    deleteOne = async (filter: any) => await FollowModel.deleteOne(filter);

    findCount = async (filter: any) => await FollowModel.countDocuments(filter);

}

export default new FollowService;
