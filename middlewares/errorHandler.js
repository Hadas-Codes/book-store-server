const errorHandler = (err, req, res, next) => {
const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
res.status(statusCode).json({
    error: {
        message: err.message, 
        type: 'server error',
        stack: err.stack}
});
}
export default errorHandler;