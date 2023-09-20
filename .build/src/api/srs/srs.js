"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.srsHandler = void 0;
const dataBase_1 = require("./../../utility/dataBase");
const response_1 = require("../../utility/response");
const core_1 = __importDefault(require("@middy/core"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const fs = __importStar(require("fs"));
const convert_excel_to_json_1 = __importDefault(require("convert-excel-to-json"));
const srs_1 = require("./model/schema/srs");
const tag = 'srs-handler';
exports.srsHandler = (0, core_1.default)((event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpMethod = event.requestContext.http.method.toLowerCase();
        const isRoot = event.pathParameters === null;
        switch (true) {
            case httpMethod === 'get':
                return isRoot ? response(event) : response(event);
            case httpMethod === 'post':
                return parseData(event);
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
const getSignedUrl = () => {
};
const response = (event) => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify({ message: `successfully invoked path--${event.rawPath} pathParameter=${event.pathParameters}` })
    };
};
const parseData = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = event.body.stream;
        if (!body) {
            return (0, response_1.errorResponse)(400, 'body is required');
        }
        const file = files(body);
        if (file) {
            const result = yield (0, convert_excel_to_json_1.default)({
                sourceFile: file
            });
            console.log(`[${tag}]:parseData`);
            console.log(result);
            const data = yield parse(result);
            console.log(data);
            yield (0, dataBase_1.dbConnect)();
            const parseData = yield srs_1.srsModal.create({
                data: data
            });
            yield removeFile(file);
            return (0, response_1.successResponse)(parseData);
        }
        yield removeFile(file);
        return response(event);
    }
    catch (error) {
        console.log(error);
        return (0, response_1.errorResponse)((error === null || error === void 0 ? void 0 : error.statusCode) ? error === null || error === void 0 ? void 0 : error.statusCode : 500, error);
    }
});
const files = (stream) => {
    try {
        let buffer = Buffer.from(stream, 'base64');
        let file = `./src/api/srs/files/demo${Date.now()}.xls`;
        fs.writeFileSync(file, buffer);
        return file;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
const removeFile = (filePath) => { fs.unlinkSync(filePath); };
const parse = (result) => {
    let data = [];
    for (let i = 0; i < result.Readme.length; i++) {
        if (i == 0) {
            continue;
        }
        let obj = {};
        for (let j = 0; j < Object.keys(result.Readme[i]).length; j++) {
            let a = Object.values(result.Readme[0]);
            if (Object.values(result.Readme[0])) {
                obj[a[j]] = Object.values(result.Readme[i])[j];
            }
        }
        data.push(obj);
    }
    return data;
};
//# sourceMappingURL=srs.js.map