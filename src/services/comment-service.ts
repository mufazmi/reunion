import CommentModel, { IComment } from '../models/comment-model';

class CommentService {
    
    create = async (data: IComment) => await CommentModel.create(data);

    update = async (_id: string, data: Partial<IComment>) => await CommentModel.updateOne({ _id }, data);

    findOne = async (filter: any) => await CommentModel.findOne(filter);

    findAll = async (filter: any) => await CommentModel.find(filter);

}

export default new CommentService;
