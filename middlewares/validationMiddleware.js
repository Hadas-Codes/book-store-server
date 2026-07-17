const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errorMessages = error.details.map(detail => detail.message).join(', ');
            
            res.status(400);
            
            return next(new Error(errorMessages));
        }
        
        next();
    };
};

export default validateBody;