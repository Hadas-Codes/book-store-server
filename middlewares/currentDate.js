const currentDate = (req, res, next) => {
    req.currentDate = new Date();
    next();
}
export default currentDate;