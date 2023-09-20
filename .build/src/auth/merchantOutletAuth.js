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
exports.authorize = void 0;
const jwks_1 = require("./jwks");
const authorize = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!event.headers.Authorization) {
            return generatePolicy({ allow: false });
        }
        const tokenService = new jwks_1.TokenService(event.headers);
        const token = yield tokenService.verifyToken();
        const access = yield verifyRoles(event, token);
        if (!access) {
            return generatePolicy({ allow: false });
        }
        const policy = generatePolicy({ allow: true });
        return policy;
    }
    catch (error) {
        console.log('im error catch', error);
        return generatePolicy({ allow: false });
    }
});
exports.authorize = authorize;
const generatePolicy = ({ allow }) => {
    const policy = {
        "principalId": "user",
        "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action": "execute-api:Invoke",
                    "Effect": allow ? "Allow" : 'Deny',
                    "Resource": "*"
                }
            ]
        }
    };
    return policy;
};
const verifyRoles = (event, token) => __awaiter(void 0, void 0, void 0, function* () {
    const path = event.requestContext.routeKey.split('/')[1];
    const httpMethod = event.requestContext.http.method.toLowerCase();
    const userRoles = token.realm_access.roles;
    switch (true) {
        case httpMethod == 'post':
            return userRoles.includes('MERCHANT_CREATE') && userRoles.includes('OUTLET_CREATE') ? true : false;
        case httpMethod == 'get':
            return userRoles.includes('MERCHANT_READ') && userRoles.includes('OUTLET_READ') ? true : false;
        case (httpMethod == 'put' || httpMethod == 'patch'):
            return userRoles.includes('MERCHANT_UPDATE') && userRoles.includes('OUTLET_UPDATE') ? true : false;
        case httpMethod == 'delete':
            return userRoles.includes('MERCHANT_DELETE') && userRoles.includes('OUTLET_DELETE') ? true : false;
    }
});
//# sourceMappingURL=merchantOutletAuth.js.map