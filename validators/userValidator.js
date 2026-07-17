import Joi from 'joi';

export const userSchema = Joi.object({
    username: Joi.string().min(2).required(),
    code: Joi.number().min(0).required(),
    email: Joi.string().email().required(), 
    password: Joi.string().min(4).required(), 
    borrowHistory: Joi.array()              
});