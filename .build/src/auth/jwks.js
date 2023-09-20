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
exports.TokenService = void 0;
const jwks_rsa_1 = require("jwks-rsa");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    constructor(headers) {
        this.url = process.env.environment === "production" ? process.env.keycloakProdUrl : process.env.keycloakLocalUrl;
        this.token = headers.Authorization.split(' ')[1];
        this.jwksClient = new jwks_rsa_1.JwksClient({
            jwksUri: `${this.url}/realms/ecobillz/protocol/openid-connect/certs`
        });
    }
    getSigningKey(kid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = yield this.jwksClient.getSigningKey(kid);
                const publickey = yield key.getPublicKey();
                return publickey;
            }
            catch (error) {
                throw error;
            }
        });
    }
    verifyToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.decode(this.token, { complete: true });
                if (decoded && decoded.header) {
                    const kid = decoded.header.kid;
                    if (kid) {
                        const signingKey = yield this.getSigningKey(kid);
                        const verified = yield jsonwebtoken_1.default.verify(this.token, signingKey);
                        return verified;
                    }
                }
                throw new Error('Kid not found in the token');
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=jwks.js.map