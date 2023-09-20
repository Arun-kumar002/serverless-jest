import { HttpService } from '../../utility/http-service';
import { appValidationError } from '../../utility/error';
import { CreateUserBody } from './model/interface/users';
import { errorResponse, successResponse } from "../../utility/response";
import { plainToClass } from 'class-transformer';
import * as KcApiRequest from './model/interface/users';

export class UserService {
    https: HttpService
    constructor() {
    }

    //user signup,login,verify
    async create(data: Object, token: string, realm: string) {

        try {
            const input = plainToClass(CreateUserBody, data)
            const error = await appValidationError(input)


            if (error) {
                return errorResponse(400, error)
            }

            const http = new HttpService(token)

            const user = await http.createUser(input, realm)

            return successResponse({ message: 'success', user })
        } catch (error) {
            throw error
        }

    }


    async findAll(token: string, realm: string) {
        try {

            const http = new HttpService(token)

            const user = await http.getAllUsers(realm) 

            return successResponse(user)
        } catch (error) {
            throw error

        }
    }

    async findOne(id: string, token: string, realm: string) {
        try {

            const http = new HttpService(token)

            const user = await http.getUser(id, realm)

            return successResponse(user)

        } catch (error) {
            console.log('im er');
            
            throw error

        }
    }

    async update(data: Object, id: string, token: string, realm: string) {
        try {

            const http = new HttpService(token)


            const user = await http.updateUser(data, id, realm)


            return successResponse(user)

        } catch (error) {
            throw error

        }
    }

    async remove(id: string, token: string, realm: string) {
        try {
            const http = new HttpService(token)


            const user = await http.removeUser(id, realm)

            return successResponse(user)

        } catch (error) {
            throw error
        }
    }


    async findAllUserRoles(id: string, token: string, realm: string) {
        try {

            const http = new HttpService(token)

            const user = await http.getUserRolesById(id, realm)


            return successResponse(user)
        } catch (error) {
            throw error

        }
    }

    async assignRoleToUser(data: Object, id: string, token: string, realm: string) {
        try {
            const http = new HttpService(token)


            const user = await http.assignRoleToUser(data as Array<KcApiRequest.AssignRoleToUserBody>, id, realm)


            return successResponse(user)

        } catch (error) {
            throw error
        }
    }

    async removeRoleFromUser(data: Object, id: string, token: string, realm: string) {
        try {
            const http = new HttpService(token)

            const user = await http.removeRoleFromUser(data as Array<KcApiRequest.AssignRoleToUserBody>, id, realm)

            return successResponse(user)

        } catch (error) {
            throw error
        }
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
    async findAllRoles(token: string, realm: string) {
        try {
            const http = new HttpService(token)

            const user = await http.getAllRoles(realm) as { statusCode: number, body: Object }


            if (user.statusCode >= 400 && user.statusCode <= 499) {
                return errorResponse(user.statusCode, user.body)
            }
            return successResponse(user)
        } catch (error) {
            throw error

        }
    }
}