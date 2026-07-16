const logGetRequests = (req, res, next) => {
    if (req.method === 'GET') {
        console.log(`[GET Request Date]: ${req.currentDate}`);
    }
    next();
};

export default logGetRequests;