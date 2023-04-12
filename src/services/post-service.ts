import PostModel, { IPost } from '../models/post-model';

class PostService {
    
    create = async (data: IPost) => await PostModel.create(data);

    update = async (filter :any, data: Partial<IPost>) => await PostModel.updateOne(filter, data);

    findOne = async (filter: any) => await PostModel.findOne(filter);

    findAll = async (filter: any) => await PostModel.find(filter);

    deleteOne = async (filter:any) => await PostModel.deleteOne(filter);

}

export default new PostService;
