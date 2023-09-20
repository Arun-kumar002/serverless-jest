"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.NetWorkError = void 0;
const log = require('serverless-logger')(__filename);
class BaseError extends Error {
    constructor(errorCode, message) {
        super();
        this.message = message;
        this.errorCode = errorCode;
    }
}
class NetWorkError extends BaseError {
    constructor(errorCode, message) {
        super(errorCode, message);
    }
}
exports.NetWorkError = NetWorkError;
const handleError = (error, tag, event) => {
    log(`[handlerError]:${tag} path-${event.rawPath}, Errorclass:${error.name}:${error.message}. ${JSON.stringify(error.stack)}. params - ${JSON.stringify(event.pathParameters)},body -${JSON.stringify(event.body)} `);
    if (error instanceof BaseError) {
        return response(event, error.errorCode, error.message);
    }
    return response(event, 500, 'Internal Server Error');
};
exports.handleError = handleError;
const response = (event, status, errorMessage) => {
    return {
        statusCode: status,
        body: JSON.stringify({ path: `successfully invoked path--${event.rawPath} pathParameter=${JSON.stringify(event.pathParameters)}`, errorMessage: errorMessage ? errorMessage : 'unkown error' })
    };
};
//# sourceMappingURL=networkError.js.map