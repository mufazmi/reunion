import { IComment } from "../models/comment-model";
import { IPost } from "../models/post-model";

class PostDto {
    id : string;
    title: string;
    desc: string;
    createdAt: string;
    likes : number;
    comments :any;

    constructor(data:IPost){
        this.id = data.id
        this.title = data.title
        this.desc = data.desc
        this.createdAt = new Date(data.createdAt).toLocaleString("en-US", {hour12: true}).replace(",", "");
        this.likes = 0;
        this.comments = [];
    }
}

export default PostDto