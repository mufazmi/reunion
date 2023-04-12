import LikeModel, { ILike } from '../models/like-model';

class LikeService {
    
    create = async (data: ILike) => await LikeModel.create(data);

    update = async (_id: string, data: Partial<ILike>) => await LikeModel.updateOne({ _id }, data);

    findOne = async (filter: any) => await LikeModel.findOne(filter);

}

export default new LikeService;
