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
        console.log('im error catch', error);
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

    const path = event.requestContext.routeKey.split('/')[1]
    const httpMethod = event.requestContext.http.method.toLowerCase()
    const userRoles = token.realm_access.roles

    switch (true) {
        case httpMethod == 'post':
            return userRoles.includes('CREATE') ? true : false
        case httpMethod == 'get':
            return userRoles.includes('READ') ? true : false
        case (httpMethod == 'put' || httpMethod == 'patch'):
            return userRoles.includes('UPDATE') ? true : false
        case httpMethod == 'delete':
            return userRoles.includes('DELETE') ? true : false
    }

}