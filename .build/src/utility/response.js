"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = exports.formatResponse = void 0;
const formatResponse = (statusCode, message, data) => {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify({
            message: message,
            data: data ? data : 'none'
        })
    };
};
exports.formatResponse = formatResponse;
const successResponse = (data) => {
    return (0, exports.formatResponse)(200, 'success', data);
};
exports.successResponse = successResponse;
const errorResponse = (code = 1000, error) => {
    if (Array.isArray(error)) {
        const errorObject = error[0].constraints;
        console.log(errorObject, 'errorObject');
        const errorMessage = errorObject[Object.keys(errorObject)[0]] || 'unknown error';
        return (0, exports.formatResponse)(code, errorMessage);
    }
    return (0, exports.formatResponse)(code, `${error}`);
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=response.js.map