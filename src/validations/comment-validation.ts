import Joi from "joi"

class CommentValidation {

    create = Joi.object({
        comment: Joi.string().min(1).max(1000).required()
    })

    update = Joi.object({
        comment: Joi.string().min(1).max(1000).optional()
    })
    

}

export default new CommentValidation