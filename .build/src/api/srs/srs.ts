import { handleError } from '../../utility/error';
import { TokenService } from '../../auth/jwks';
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { errorResponse, successResponse } from '../../utility/response';
import middy from '@middy/core'
import bodyParser from '@middy/http-json-body-parser'

const tag = 'srs-handler'


export const srsHandler = middy(async (event: APIGatewayProxyEventV2) => {

    try {

        const httpMethod = event.requestContext.http.method.toLowerCase()

        const tokenService = new TokenService(event.headers)
        const token = await tokenService.verifyToken()

        if (!token) {
            return errorResponse(400, 'Authentication token required')
        }

        const isRoot = event.pathParameters === null


        switch (true) {
            case httpMethod === 'get':
                return isRoot ? response(event) : response(event)
            case httpMethod === 'post':
                return response(event)
            case httpMethod === 'put':
                return response(event)
            case httpMethod === 'delete':
                return response(event)
        }

    } catch (error) {

        return {
            statusCode: error?.statusCode,
            body: JSON.stringify({ message: error.message })
        }
    }


}).use(bodyParser())



const response = (event: APIGatewayProxyEventV2) => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",

        },
        body: JSON.stringify({ message: `successfully invoked path--${event.rawPath} pathParameter=${event.pathParameters}` })
    }
}














