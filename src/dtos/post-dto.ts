
class PostDto {
    id;
    title;
    desc;
    createdAt;

    constructor(data:any){
        this.id = data.id
        this.title = data.title
        this.desc = data.desc
        this.createdAt = new Date(data.createdAt).toLocaleString("en-US", {hour12: true}).replace(",", "");
    }
}

export default PostDto