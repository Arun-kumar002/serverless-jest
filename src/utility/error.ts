import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ValidationError, validate } from "class-validator";
const log = require('serverless-logger')(__filename)

export const appValidationError = async (input: any): Promise<ValidationError[] | false> => {

    const error = await validate(input, {
        validationError: { target: true }
    })

    if (error.length) {
        return error
    }
    return false
}


export const handleError = (event: APIGatewayProxyEventV2, error: any, tag: string) => {

    log(`[handlerError]:${tag} path-${event.rawPath}, Errorclass:${error.name}:${error.message}. ${JSON.stringify(error.stack)}. params - ${JSON.stringify(event.pathParameters)},body -${JSON.stringify(event.body)} `);
};