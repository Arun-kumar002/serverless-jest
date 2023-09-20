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
exports.HttpService = void 0;
const KcApiRequest = __importStar(require("../api/user/model/interface/users"));
const apisauce_1 = __importDefault(require("apisauce"));
const axios_1 = __importDefault(require("axios"));
const serviceError = __importStar(require("../error/networkError"));
class HttpService {
    constructor(token) {
        this.url = process.env.environment === "production" ? process.env.keycloakProdUrl : process.env.keycloakLocalUrl;
        this.instance = apisauce_1.default.create({
            baseURL: this.url,
            axiosInstance: axios_1.default.create({ baseURL: this.url })
        });
        this.instance.axiosInstance.interceptors.request.use((config) => __awaiter(this, void 0, void 0, function* () {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }), (error) => Promise.reject(error));
        this.instance.axiosInstance.interceptors.response.use((response) => __awaiter(this, void 0, void 0, function* () { return response; }), (error) => __awaiter(this, void 0, void 0, function* () {
            throw error;
        }));
    }
    post(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const endPoint = request.endpoint;
            const body = request.getBody();
            const params = request.getParams();
            const response = yield this.instance.post(endPoint, body, { params: params });
            if (response.ok) {
                if (response.data) {
                    return response.data;
                }
                return response;
            }
            if (response.problem) {
                let data = response.data;
                throw new serviceError.NetWorkError(response.status ? response.status : 400, data.errorMessage || data.error ? data.errorMessage || data.error : response.problem);
            }
        });
    }
    get(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const endPoint = request.endpoint;
            const params = request.getParams();
            const response = yield this.instance.get(endPoint, {}, { params: params });
            if (response.ok) {
                if (response.data) {
                    return response.data;
                }
                return response;
            }
            if (response.problem) {
                // console.log(response, 'response');
                let data = response.data;
                throw new serviceError.NetWorkError(response.status ? response.status : 400, data.errorMessage || data.error ? data.errorMessage || data.error : response.problem);
            }
        });
    }
    put(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const endPoint = request.endpoint;
            const body = request.getBody();
            const params = request.getParams();
            let response = yield this.instance.put(endPoint, body, { params: params });
            if (response.ok) {
                if (response.data) {
                    return response.data;
                }
                return response.status;
            }
            if (response.problem) {
                let data = response.data;
                throw new serviceError.NetWorkError(response.status ? response.status : 400, data.errorMessage || data.error ? data.errorMessage || data.error : response.problem);
            }
        });
    }
    delete(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const endPoint = request.endpoint;
            const body = request.getBody();
            const params = request.getParams();
            let response = yield this.instance.delete(endPoint, {}, { params: params, data: body });
            if (response.ok) {
                if (response.data) {
                    return response.data;
                }
                return response.status;
            }
            if (response.problem) {
                let data = response.data;
                throw new serviceError.NetWorkError(response.status ? response.status : 400, data.errorMessage || data.error ? data.errorMessage || data.error : response.problem);
            }
        });
    }
    createUser(body, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.post(new KcApiRequest.CreateUserRequest(realm, body));
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUser(id, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.get(new KcApiRequest.GetUser(realm, id));
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllUsers(realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.get(new KcApiRequest.GetAllUsers(realm));
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUser(body, id, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.put(new KcApiRequest.UpadteUsers(realm, body, id));
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    removeUser(id, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.delete(new KcApiRequest.RomoveUserRequest(realm, id));
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    assignRoleToUser(role, id, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield this.post(new KcApiRequest.AssignRoleToUserRequest(realm, id, role));
                return roles;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserRolesById(id, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield this.get(new KcApiRequest.GetUserRolesByIdRequest(realm, id));
                return roles;
            }
            catch (error) {
                throw error;
            }
        });
    }
    removeRoleFromUser(payload, id, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield this.delete(new KcApiRequest.RemoveUserRoleFromUserRequest(realm, id, payload));
                return roles;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getRole(id, realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield this.get(new KcApiRequest.GetRoleById(realm, id));
                return role;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllRoles(realm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield this.get(new KcApiRequest.GetRoles(realm));
                return roles;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.HttpService = HttpService;
//# sourceMappingURL=http-service.js.map