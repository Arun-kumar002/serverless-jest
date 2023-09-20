import { JwtPayload } from 'jsonwebtoken';
import { TokenService } from './jwks';
import { APIGatewayProxyEventV2 } from "aws-lambda";
export const authorize = async (event: APIGatewayProxyEventV2) => {

    try {
        if (!event.headers.Authorization) {
            return generatePolicy({ allow: false });
        }

        const tokenService = new TokenService(event.headers)
        const token = await tokenService.verifyToken()
        const access = await verifyRoles(event, token)


        if (!access) {
            return generatePolicy({ allow: false });
        }

        const policy = generatePolicy({ allow: true });

        return policy

    } catch (error) {

        return generatePolicy({ allow: false });

    }
};


interface IPolicy {
    allow: boolean;
}

const generatePolicy = ({ allow }: IPolicy) => {
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
    }
    return policy;
};


const verifyRoles = async (event: APIGatewayProxyEventV2, token: JwtPayload) => {



    const path = event.requestContext.routeKey.split('/')
    const httpMethod = event.requestContext.http.method.toLowerCase()
    const userRoles = token.realm_access.roles

    let access;
    switch (true) {
        case httpMethod == 'post':
            access = verifyNestedRoles(path, httpMethod, userRoles)
            return access
        case httpMethod == 'get':
            access = verifyNestedRoles(path, httpMethod, userRoles)
            return access
        case (httpMethod == 'put' || httpMethod == 'patch'):
            access = verifyNestedRoles(path, httpMethod, userRoles)
            return access
        case httpMethod == 'delete':
            access = verifyNestedRoles(path, httpMethod, userRoles)
            return access
    }
}


const verifyNestedRoles = (paths: Array<string>, method: string, userRoles: Array<string>) => {

    let access = true
    for (let x of paths) {
        if (x.includes('{') || x.length <= 0 || x.includes('}') || x.includes('GET') || x.includes('POST') || x.includes('PUT') || x.includes('PATCH') || x.includes('DELETE')) {
            let index = paths.indexOf(x)
            paths.splice(index, 1)
        }
    }


    for (let path of paths) {
        if (method === 'post' && !userRoles.includes(`${path.toUpperCase().trim()}_CREATE`)) {
            access = false
            break;
        }
        if (method === 'get' && !userRoles.includes(`${path.toUpperCase().trim()}_READ`)) {
            console.log(`${path.toUpperCase()}_READ`, userRoles);
            access = false
            break;
        }
        if ((method === 'put' || method === 'patch') && !userRoles.includes(`${path.toUpperCase().trim()}_UPDATE`)) {
            access = false
            break;
        }
        if (method === 'DELETE' && !userRoles.includes(`${path.toUpperCase().trim()}_DELETE`)) {
            access = false
            break;
        }
    }

    console.log(access);

    return access

}


