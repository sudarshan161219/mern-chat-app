const errorHandlerMiddleware = (err, req, res, next) => {
const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
res.status(statusCode)
res.json({
    message: err.message,
    stack: ProcessingInstruction.env.NODE_ENV === "production" ? null :err.stack
    
})
};

export default errorHandlerMiddleware;
