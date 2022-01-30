const ErrorResponse = require("../utils/errorResponse");

const errorHandler = function(err, req, res, next){
    
    let error = { ...err };

    error.message = err.message;

    //Mongoose Bad ObjectID

    if(err.name === "CastError"){
        const message = `Bootcamp not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json({
        success : false,
        error : error.message || "Server Error"
    })
}

module.exports = errorHandler