import { handleError } from '../../utility/error';
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

        switch (true) {
            case httpMethod === 'get' && path === 'users':
                return isRoot ? user.findAll() : user.findOne()
            case httpMethod === 'get' && path === 'all-roles':
                return user.findAllRoles()
            case httpMethod === 'get' && path === 'user-roles':
                return user.getUserRoles()
            case httpMethod === 'post' && path === 'users':
                return user.create()
            case httpMethod === 'post' && path === 'user-roles':
                return user.assignRoleToUser()
            case httpMethod === 'put' && path === 'users':
                return user.update()
            case httpMethod === 'delete' && path === 'users':
                return user.remove()
            case httpMethod === 'delete' && path === 'user-roles':
                return user.removeRoleFromUser()
        }

    } catch (error) {

        logger(error);
        return {
            statusCode: error?.statusCode || 500,
            body: JSON.stringify({ message: error.message })
        }
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
            return service.create(this.event.body, this.token, this.realm)
        } catch (error) {
            handleError(this.event, error, tag)
            throw error
        }

    }

    async findAll() {
        try {
            return service.findAll(this.token, this.realm)
        } catch (error) {
            handleError(this.event, error, tag)
            throw error
        }
    }
    async findOne() {
        try {
            return service.findOne(this.event.pathParameters.id, this.token, this.realm)
        } catch (error) {
            handleError(this.event, error, tag)
            throw error
        }
    }
    async update() {
        try {
            return service.update(this.event.body, this.event.pathParameters.id, this.token, this.realm)
        } catch (error) {
            handleError(this.event, error, tag)
            throw error
        }
    }
    async remove() {
        try {
            return service.remove(this.event.pathParameters.id, this.token, this.realm)
        } catch (error) {
            handleError(this.event, error, tag)
            throw error
        }
    }

    async getUserRoles() {
        try {
            return service.findAllUserRoles(this.event.pathParameters.id, this.token, this.realm)
        } catch (error) {
            handleError(this.event, error, tag)
            throw error
        }
    }
    async assignRoleToUser() {
        try {
            return service.assignRoleToUser(this.event.body, this.event.pathParameters.id, this.token, this.realm)
        } catch (error) {
            handleError(this.event, error, tag)
            throw error
        }
    }

    async removeRoleFromUser() {
        try {

            return service.removeRoleFromUser(this.event.body, this.event.pathParameters.id, this.token, this.realm)
        } catch (error) {
            handleError(this.event, error, tag)
            throw error
        }
    }
    /******Roles*****/
    async findAllRoles() {
        try {
            return service.findAllRoles(this.token, this.realm)
        } catch (error) {
            handleError(this.event, error, tag)
            handleError(this.event, error, tag)
            throw error
        }
    }



}










