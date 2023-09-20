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
exports.users = void 0;
const networkError_1 = require("../../error/networkError");
const tsyringe_1 = require("tsyringe");
const userService_1 = require("./userService");
const core_1 = __importDefault(require("@middy/core"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const logger = require('serverless-logger')(__filename);
const tag = 'user-handler';
const service = tsyringe_1.container.resolve(userService_1.UserService);
exports.users = (0, core_1.default)((event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const tokenService = new TokenService(event.headers)
        // const token = await tokenService.verifyToken()
        // if (!token) {
        //     return errorResponse(400, 'Authentication token required')
        // }
        const httpMethod = event.requestContext.http.method.toLowerCase();
        const isRoot = event.pathParameters === null;
        const user = new UserHandler(event);
        const path = event.requestContext.routeKey.split('/')[1];
        let request;
        switch (true) {
            case httpMethod === 'get' && path === 'user':
                request = (yield isRoot) ? user.findAll() : user.findOne();
                return request;
            case httpMethod === 'get' && path === 'all-roles':
                request = yield user.findAllRoles();
                return request;
            case httpMethod === 'get' && path === 'user-roles':
                request = yield user.getUserRoles();
                return request;
            case httpMethod === 'post' && path === 'user':
                request = yield user.create();
                return request;
            case httpMethod === 'post' && path === 'user-roles':
                request = yield user.assignRoleToUser();
                return request;
            case httpMethod === 'put' && path === 'user':
                request = yield user.update();
                return request;
            case httpMethod === 'delete' && path === 'user':
                request = yield user.remove();
                return request;
            case httpMethod === 'delete' && path === 'user-roles':
                request = yield user.removeRoleFromUser();
                return request;
        }
    }
    catch (error) {
        return (0, networkError_1.handleError)(error, tag, event);
    }
})).use((0, http_json_body_parser_1.default)());
class UserHandler {
    constructor(event) {
        this.event = event;
        this.token = event.headers.authorization.split(' ')[1];
        this.realm = event.headers.tenentid;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield service.create(this.event.body, this.token, this.realm);
                return user;
            }
            catch (error) {
                return (0, networkError_1.handleError)(error, tag, this.event);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield service.findAll(this.token, this.realm);
                return user;
            }
            catch (error) {
                return (0, networkError_1.handleError)(error, tag, this.event);
            }
        });
    }
    findOne() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield service.findOne(this.event.pathParameters.id, this.token, this.realm);
                return user;
            }
            catch (error) {
                return (0, networkError_1.handleError)(error, tag, this.event);
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield service.update(this.event.body, this.event.pathParameters.id, this.token, this.realm);
                return user;
            }
            catch (error) {
                return (0, networkError_1.handleError)(error, tag, this.event);
            }
        });
    }
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield service.remove(this.event.pathParameters.id, this.token, this.realm);
                return user;
            }
            catch (error) {
                return (0, networkError_1.handleError)(error, tag, this.event);
            }
        });
    }
    getUserRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = service.findAllUserRoles(this.event.pathParameters.id, this.token, this.realm);
                return roles;
            }
            catch (error) {
                return (0, networkError_1.handleError)(error, tag, this.event);
            }
        });
    }
    assignRoleToUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield service.assignRoleToUser(this.event.body, this.event.pathParameters.id, this.token, this.realm);
                return roles;
            }
            catch (error) {
                return (0, networkError_1.handleError)(error, tag, this.event);
            }
        });
    }
    removeRoleFromUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield service.removeRoleFromUser(this.event.body, this.event.pathParameters.id, this.token, this.realm);
                return roles;
            }
            catch (error) {
                return (0, networkError_1.handleError)(error, tag, this.event);
            }
        });
    }
    /******Roles*****/
    findAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield service.findAllRoles(this.token, this.realm);
                return roles;
            }
            catch (error) {
                return (0, networkError_1.handleError)(error, tag, this.event);
            }
        });
    }
}
//# sourceMappingURL=userHandler.js.map