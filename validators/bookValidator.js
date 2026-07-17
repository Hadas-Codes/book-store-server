import Joi from 'joi';

export const bookSchema = Joi.object({
    title: Joi.string().min(2).required(),
    code: Joi.number().min(0).required(),
    category: Joi.string().required(), 
    isBorrowed: Joi.boolean(),          
    borrowHistory: Joi.array()         
});

export const updateUserSchema = Joi.object({
    username: Joi.string().min(2),
    code: Joi.number().min(0),
    email: Joi.string().email(),
    password: Joi.string().min(4),
    borrowHistory: Joi.array()              
});