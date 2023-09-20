import { JwksClient } from "jwks-rsa";
import { APIGatewayProxyEventHeaders } from "aws-lambda";
import jwt from 'jsonwebtoken';

export class TokenService {
    private jwksClient: JwksClient
    private headers: APIGatewayProxyEventHeaders
    private url: string
    private token: string
    constructor(headers: APIGatewayProxyEventHeaders) {
        this.url = process.env.environment === "production" ? process.env.keycloakProdUrl as string : process.env.keycloakLocalUrl as string
        this.token = headers.Authorization.split(' ')[1] as string
        this.jwksClient = new JwksClient({
            jwksUri: `${this.url}/realms/ecobillz/protocol/openid-connect/certs`
        })

    }

    async getSigningKey(kid: string): Promise<string> {

        try {
            const key = await this.jwksClient.getSigningKey(kid);

            const publickey = await key.getPublicKey();

            return publickey
        } catch (error) {

            throw error

        }

    }

    async verifyToken(): Promise<jwt.JwtPayload | {}> {

        try {
            const decoded = jwt.decode(this.token, { complete: true })


            if (decoded && decoded.header) {
                const kid = decoded.header.kid

                if (kid) {
                    const signingKey = await this.getSigningKey(kid);
                    const verified = await jwt.verify(this.token, signingKey) as jwt.JwtPayload;
                    return verified
                }

            }
            throw new Error('Kid not found in the token')
        } catch (error) {

            throw error
        }
    }

}