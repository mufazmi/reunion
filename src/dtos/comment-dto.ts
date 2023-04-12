
class CommentDto {

    id;
    comment;

    constructor(data: any) {
        this.id = data._id;
        this.comment = data.comment
    }

}

export default CommentDto;