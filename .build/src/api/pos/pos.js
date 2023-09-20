"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.posHandler = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const tag = 'pos-handler';
exports.posHandler = (0, core_1.default)((event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpMethod = event.requestContext.http.method.toLowerCase();
        // const tokenService = new TokenService(event.headers)
        // const token = await tokenService.verifyToken()
        // if (!token) {
        //     return errorResponse(400, 'Authentication token required')
        // }
        const isRoot = event.pathParameters === null;
        switch (true) {
            case httpMethod === 'get':
                return isRoot ? response(event) : response(event);
            case httpMethod === 'post':
                return response(event);
            case httpMethod === 'put':
                return response(event);
            case httpMethod === 'delete':
                return response(event);
        }
    }
    catch (error) {
        return {
            statusCode: error === null || error === void 0 ? void 0 : error.statusCode,
            body: JSON.stringify({ message: error.message })
        };
    }
})).use((0, http_json_body_parser_1.default)());
const response = (event) => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify({ message: `successfully invoked path--${event.rawPath} pathParameter=${JSON.stringify(event.pathParameters)}` })
    };
};
// const s3 = new AWS.S3();
// const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
// const fileUpload = async (event: APIGatewayProxyEventV2) => {
//     try {
//         const body = JSON.parse(event.body);
//         if (!body || !body.image || !body.mime) {
//             return errorResponse(400, "incorrect body on request");
//         }
//         if (!allowedMimes.includes(body.mime)) {
//             return errorResponse(400, "mime is not allowed ");
//         }
//         let imageData = body.image;
//         if (body.image.substr(0, 7) === "base64,") {
//             imageData = body.image.substr(7, body.image.length);
//         }
//         const buffer = Buffer.from(imageData, "base64");
//         const fileInfo = await fileType.fileTypeFromBuffer(buffer);
//         const detectedExt = fileInfo.ext;
//         const detectedMime = fileInfo.mime;
//         if (detectedMime !== body.mime) {
//             return errorResponse(400, "mime types dont match");
//         }
//         const key = `dexter${Date.now()}.${detectedExt}`;
//         console.log(`writing image to bucket called ${key}`);
//         await s3
//             .putObject({
//                 Body: buffer,
//                 Key: key,
//                 ContentType: body.mime,
//                 Bucket: "my-image-upload-bucket-demo-sws1",
//                 ACL: "public-read",
//             })
//             .promise();
//         const url = `https://my-image-upload-bucket-demo-sws1.s3-ap-northeast-1.amazonaws.com/${key}`;
//         return successResponse({
//             imageURL: url,
//         });
//     } catch (error) {
//         console.log("error", error);
//         return errorResponse(400,
//             error.message || "failed to upload image",
//         );
//     }
// };
//# sourceMappingURL=pos.js.map