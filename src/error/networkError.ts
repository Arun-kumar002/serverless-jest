import { APIGatewayProxyEventV2 } from "aws-lambda";
const log = require('serverless-logger')(__filename)


class BaseError extends Error {
    public errorCode: number;
    constructor(errorCode: number, message: string) {
        super();
        this.message = message;
        this.errorCode = errorCode;
    }
}

export class NetWorkError extends BaseError {
    constructor(errorCode: number, message: string) {
        super(errorCode, message);

    }
}



export const handleError = (error: any, tag: string, event: APIGatewayProxyEventV2) => {

    log(`[handlerError]:${tag} path-${event.rawPath}, Errorclass:${error.name}:${error.message}. ${JSON.stringify(error.stack)}. params - ${JSON.stringify(event.pathParameters)},body -${JSON.stringify(event.body)} `);
    if (error instanceof BaseError) {
        return response(event, error.errorCode, error.message)
    }


    return response(event, 500, 'Internal Server Error');
};

     

const response = (event: APIGatewayProxyEventV2, status: number, errorMessage?: string) => {
    return {
        statusCode: status,
        body: JSON.stringify({ path: `successfully invoked path--${event.rawPath} pathParameter=${JSON.stringify(event.pathParameters)}`, errorMessage: errorMessage ? errorMessage : 'unkown error' })
    }

}

