import Joi from "joi"

class AuthValidation {

    register = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    login = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

}

export default new AuthValidation