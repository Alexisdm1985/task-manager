const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        
        try {
            await fn(req, res, next)
        } catch (error) { 
            next(error) // docs: http://expressjs.com/en/guide/error-handling.html#the-default-error-handler
        };
    };
};

module.exports = asyncWrapper;