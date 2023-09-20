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
    const path = event.requestContext.routeKey.split('/');
    const httpMethod = event.requestContext.http.method.toLowerCase();
    const userRoles = token.realm_access.roles;
    let access;
    switch (true) {
        case httpMethod == 'post':
            access = verifyNestedRoles(path, httpMethod, userRoles);
            return access;
        case httpMethod == 'get':
            access = verifyNestedRoles(path, httpMethod, userRoles);
            return access;
        case (httpMethod == 'put' || httpMethod == 'patch'):
            access = verifyNestedRoles(path, httpMethod, userRoles);
            return access;
        case httpMethod == 'delete':
            access = verifyNestedRoles(path, httpMethod, userRoles);
            return access;
    }
});
const verifyNestedRoles = (paths, method, userRoles) => {
    let access = true;
    for (let x of paths) {
        if (x.includes('{') || x.length <= 0 || x.includes('}') || x.includes('GET') || x.includes('POST') || x.includes('PUT') || x.includes('PATCH') || x.includes('DELETE')) {
            let index = paths.indexOf(x);
            paths.splice(index, 1);
        }
    }
    for (let path of paths) {
        if (method === 'post' && !userRoles.includes(`${path.toUpperCase().trim()}_CREATE`)) {
            access = false;
            break;
        }
        if (method === 'get' && !userRoles.includes(`${path.toUpperCase().trim()}_READ`)) {
            console.log(`${path.toUpperCase()}_READ`, userRoles);
            access = false;
            break;
        }
        if ((method === 'put' || method === 'patch') && !userRoles.includes(`${path.toUpperCase().trim()}_UPDATE`)) {
            access = false;
            break;
        }
        if (method === 'DELETE' && !userRoles.includes(`${path.toUpperCase().trim()}_DELETE`)) {
            access = false;
            break;
        }
    }
    console.log(access);
    return access;
};
//# sourceMappingURL=authorizer.js.map