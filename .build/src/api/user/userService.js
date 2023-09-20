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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_service_1 = require("../../utility/http-service");
const error_1 = require("../../utility/error");
const users_1 = require("./model/interface/users");
const response_1 = require("../../utility/response");
const class_transformer_1 = require("class-transformer");
class UserService {
    constructor() {
    }
    //user signup,login,verify
    create(data, token, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = (0, class_transformer_1.plainToClass)(users_1.CreateUserBody, data);
                const error = yield (0, error_1.appValidationError)(input);
                if (error) {
                    return (0, response_1.errorResponse)(400, error);
                }
                const http = new http_service_1.HttpService(token);
                const user = yield http.createUser(input, realm);
                return (0, response_1.successResponse)({ message: 'success', user });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll(token, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const http = new http_service_1.HttpService(token);
                const user = yield http.getAllUsers(realm);
                return (0, response_1.successResponse)(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(id, token, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const http = new http_service_1.HttpService(token);
                const user = yield http.getUser(id, realm);
                return (0, response_1.successResponse)(user);
            }
            catch (error) {
                console.log('im er');
                throw error;
            }
        });
    }
    update(data, id, token, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const http = new http_service_1.HttpService(token);
                const user = yield http.updateUser(data, id, realm);
                return (0, response_1.successResponse)(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    remove(id, token, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const http = new http_service_1.HttpService(token);
                const user = yield http.removeUser(id, realm);
                return (0, response_1.successResponse)(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAllUserRoles(id, token, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const http = new http_service_1.HttpService(token);
                const user = yield http.getUserRolesById(id, realm);
                return (0, response_1.successResponse)(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    assignRoleToUser(data, id, token, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const http = new http_service_1.HttpService(token);
                const user = yield http.assignRoleToUser(data, id, realm);
                return (0, response_1.successResponse)(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    removeRoleFromUser(data, id, token, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const http = new http_service_1.HttpService(token);
                const user = yield http.removeRoleFromUser(data, id, realm);
                return (0, response_1.successResponse)(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // async genereateToken(data: Object) {
    //     try {
    //         const user = await axios.post('http://localhost:8080/realms/ecobillz/protocol/openid-connect/token', data, {
    //             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //         })
    //         return successResponse(user)
    //     } catch (error) {
    //         console.log(error);
    //         throw error
    //     }
    // }
    findAllRoles(token, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const http = new http_service_1.HttpService(token);
                const user = yield http.getAllRoles(realm);
                if (user.statusCode >= 400 && user.statusCode <= 499) {
                    return (0, response_1.errorResponse)(user.statusCode, user.body);
                }
                return (0, response_1.successResponse)(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map