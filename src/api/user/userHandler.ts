import { handleError, NetWorkError } from '../../error/networkError';
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { container } from 'tsyringe'
import { UserService } from './userService'
import middy from '@middy/core'
import bodyParser from '@middy/http-json-body-parser'
const logger = require('serverless-logger')(__filename)

const tag = 'user-handler'
const service = container.resolve(UserService)


export const users = middy(async (event: APIGatewayProxyEventV2) => {

    try {

        // const tokenService = new TokenService(event.headers)
        // const token = await tokenService.verifyToken()

        // if (!token) {
        //     return errorResponse(400, 'Authentication token required')
        // }

        const httpMethod = event.requestContext.http.method.toLowerCase()
        const isRoot = event.pathParameters === null

        const user = new UserHandler(event)

        const path = event.requestContext.routeKey.split('/')[1]

        let request;
        switch (true) {
            case httpMethod === 'get' && path === 'user':
                request = await isRoot ? user.findAll() : user.findOne()
                return request
            case httpMethod === 'get' && path === 'all-roles':
                request = await user.findAllRoles()
                return request
            case httpMethod === 'get' && path === 'user-roles':
                request = await user.getUserRoles()
                return request
            case httpMethod === 'post' && path === 'user':
                request = await user.create()
                return request
            case httpMethod === 'post' && path === 'user-roles':
                request = await user.assignRoleToUser()
                return request
            case httpMethod === 'put' && path === 'user':
                request = await user.update()
                return request
            case httpMethod === 'delete' && path === 'user':
                request = await user.remove()
                return request
            case httpMethod === 'delete' && path === 'user-roles':
                request = await user.removeRoleFromUser()
                return request

        }

    } catch (error) {
        return handleError(error, tag, event)
    }


}).use(bodyParser())



class UserHandler {
    private event: APIGatewayProxyEventV2
    private token: string
    private realm: string

    constructor(event: APIGatewayProxyEventV2) {
        this.event = event
        this.token = event.headers.authorization.split(' ')[1] as string
        this.realm = event.headers.tenentid as string
    }

    async create() {
        try {
            const user = await service.create(this.event.body, this.token, this.realm)

            return user
        } catch (error) {
            return handleError(error, tag, this.event)

        }

    }

    async findAll() {
        try {
            const user = await service.findAll(this.token, this.realm)
            return user

        } catch (error) {

            return handleError(error, tag, this.event)

        }
    }
    async findOne() {
        try {
            const user = await service.findOne(this.event.pathParameters.id, this.token, this.realm)
            return user

        } catch (error) {

            return handleError(error, tag, this.event)

        }
    }
    async update() {
        try {
            const user = await service.update(this.event.body, this.event.pathParameters.id, this.token, this.realm)
            return user

        } catch (error) {

            return handleError(error, tag, this.event)

        }
    }
    async remove() {
        try {
            const user = await service.remove(this.event.pathParameters.id, this.token, this.realm)
            return user

        } catch (error) {
            return handleError(error, tag, this.event)

        }
    }

    async getUserRoles() {
        try {
            const roles = service.findAllUserRoles(this.event.pathParameters.id, this.token, this.realm)
            return roles
        } catch (error) {

            return handleError(error, tag, this.event)

        }
    }
    async assignRoleToUser() {
        try {
            const roles = await service.assignRoleToUser(this.event.body, this.event.pathParameters.id, this.token, this.realm)
            return roles

        } catch (error) {
            return handleError(error, tag, this.event)

        }
    }

    async removeRoleFromUser() {
        try {

            const roles = await service.removeRoleFromUser(this.event.body, this.event.pathParameters.id, this.token, this.realm)
            return roles

        } catch (error) {

            return handleError(error, tag, this.event)

        }
    }
    /******Roles*****/
    async findAllRoles() {
        try {
            const roles = await service.findAllRoles(this.token, this.realm)
            return roles

        } catch (error) {


            return handleError(error, tag, this.event)

        }
    }




}







