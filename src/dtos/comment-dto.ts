import { IComment } from "../models/comment-model";

class CommentDto {

    id : string;
    comment : string;

    constructor(data: IComment) {
        this.id = data._id;
        this.comment = data.comment
    }

}

export default CommentDto;