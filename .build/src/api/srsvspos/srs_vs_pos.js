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
exports.srsvsPosHandler = void 0;
const jwks_1 = require("../../auth/jwks");
const response_1 = require("../../utility/response");
const core_1 = __importDefault(require("@middy/core"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const tag = 'srsvsPos-handler';
exports.srsvsPosHandler = (0, core_1.default)((event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpMethod = event.requestContext.http.method.toLowerCase();
        const tokenService = new jwks_1.TokenService(event.headers);
        const token = yield tokenService.verifyToken();
        if (!token) {
            return (0, response_1.errorResponse)(400, 'Authentication token required');
        }
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
        body: JSON.stringify({ message: `successfully invoked path--${event.rawPath} pathParameter=${event.pathParameters}` })
    };
};
//# sourceMappingURL=srs_vs_pos.js.map