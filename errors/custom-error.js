class CustomError extends Error{

    constructor(message, status){
        super(message) //cambiar por this.message para probar
        this.statusCode = status
    };
}


const createCustomError = (msg, statusCode) => {
    const error = new CustomError(msg, statusCode)
    return error;
};


module.exports = {
    createCustomError,
    CustomError
};