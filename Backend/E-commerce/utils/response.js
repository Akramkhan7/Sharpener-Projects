const sendErrorResponse = (res, err) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        message,
        status: false
    });
};

const sendResponse = (res, data, statusCode = 200) => {
    return res.status(statusCode).json({
        data
    });
};

module.exports = {
    sendErrorResponse,
    sendResponse
};