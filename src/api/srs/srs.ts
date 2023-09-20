import { dbConnect } from './../../utility/dataBase';
import { handleError } from '../../utility/error';
import { TokenService } from '../../auth/jwks';
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { errorResponse, successResponse } from '../../utility/response';
import middy from '@middy/core'
import bodyParser from '@middy/http-json-body-parser'
import * as fs from 'fs'
import excelToJson from 'convert-excel-to-json'
import { srsModal } from './model/schema/srs'


const tag = 'srs-handler'


export const srsHandler = middy(async (event: APIGatewayProxyEventV2) => {

    try {

        const httpMethod = event.requestContext.http.method.toLowerCase()


        const isRoot = event.pathParameters === null

        switch (true) {
            case httpMethod === 'get':
                return isRoot ? response(event) : response(event)
            case httpMethod === 'post':
                return parseData(event)
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


const getSignedUrl = () => {

}


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


const parseData = async (event: any) => {
    try {

        const body = event.body.stream
        if (!body) {
            return errorResponse(400, 'body is required')
        }
        const file: string = files(body)

        if (file) {
            const result = await excelToJson({
                sourceFile: file
            });
            console.log(`[${tag}]:parseData`);
            console.log(result);

            const data: Array<Object> = await parse(result)

            console.log(data);

            await dbConnect()
            const parseData = await srsModal.create({
                data: data
            })


            await removeFile(file)

            return successResponse(parseData)
        }

        await removeFile(file)

        return response(event)
    } catch (error) {
        console.log(error);
        return errorResponse(error?.statusCode ? error?.statusCode : 500, error)

    }


}

const files = (stream: string) => {
    try {
        let buffer = Buffer.from(stream, 'base64')
        let file = `./src/api/srs/files/demo${Date.now()}.xls`
        fs.writeFileSync(file, buffer)
        return file
    } catch (error) {
        console.log(error);
        throw error
    }
}

const removeFile = (filePath: string) => { fs.unlinkSync(filePath) }

const parse = (result: any) => {

    let data = []

    for (let i = 0; i < result.Readme.length; i++) {

        if (i == 0) {
            continue
        }

        let obj: any = {}
        for (let j = 0; j < Object.keys(result.Readme[i]).length; j++) {
            let a = Object.values(result.Readme[0]) as Array<string>
            if (Object.values(result.Readme[0])) {
                obj[a[j]] = Object.values(result.Readme[i])[j]
            }
        }

        data.push(obj)
    }
    return data
}









