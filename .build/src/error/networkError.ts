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

    if (error instanceof BaseError) {
        return response(event, error.errorCode, error.message)
    }

    log(`[handlerError]:${tag} path-${event.rawPath}, Errorclass:${error.name}:${error.message}. ${JSON.stringify(error.stack)}. params - ${JSON.stringify(event.pathParameters)},body -${JSON.stringify(event.body)} `);

    return response(event, 500)
};

const response = (event: APIGatewayProxyEventV2, status: number, errorMessage?: string) => {
    return {
        statusCode: status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",

        },
        body: JSON.stringify({ message: `successfully invoked path--${event.rawPath} pathParameter=${event.pathParameters}`, errorMessage: errorMessage ? errorMessage : 'unkown error' })
    }

}

