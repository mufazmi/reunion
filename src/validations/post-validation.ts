import Joi from "joi"

class PostValidation {

    create = Joi.object({
        title: Joi.string().min(1).max(1000).required(),
        desc: Joi.string().min(1).max(8000).required()
    })

    update = Joi.object({
        title: Joi.string().min(1).max(1000).optional(),
        desc: Joi.string().min(1).max(8000).optional()
    })
    

}

export default new PostValidation