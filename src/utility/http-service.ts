import * as KcApiRequest from '../api/user/model/interface/users';
import apiSauce, { ApisauceInstance } from 'apisauce';
import axios, { AxiosInstance } from 'axios';
import { errorResponse } from './response';
import * as serviceError from '../error/networkError'

export class HttpService {
    private instance: ApisauceInstance;
    private url: string

    constructor(token: string) {
        this.url = process.env.environment === "production" ? process.env.keycloakProdUrl as string : process.env.keycloakLocalUrl as string
        this.instance = apiSauce.create({
            baseURL: this.url,
            axiosInstance: axios.create({ baseURL: this.url })
        })

        this.instance.axiosInstance.interceptors.request.use(
            async (config) => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;

            },
            (error) => Promise.reject(error)

        )
        this.instance.axiosInstance.interceptors.response.use(
            async (response) => response,
            async (error) => {
                throw error
            })
    }


    private async post<T>(
        request: KcApiRequest.IKCCreateUserRequestParams
    ) {
        const endPoint = request.endpoint;
        const body = request.getBody();
        const params = request.getParams();
        const response = await this.instance.post<T>(endPoint, body, { params: params });
        if (response.ok) {


            if (response.data) {
                return response.data;
            }
            return response;
        }

        if (response.problem) {
            let data: any = response.data;
            throw new serviceError.NetWorkError(response.status ? response.status : 400, data.errorMessage || data.error ? data.errorMessage || data.error : response.problem as string)
        }
    }

    private async get<T>(
        request: KcApiRequest.GetAllUsers | KcApiRequest.GetUser

    ) {
        const endPoint = request.endpoint;
        const params = request.getParams();
        const response = await this.instance.get<T>(endPoint, {}, { params: params });

        if (response.ok) {


            if (response.data) {
                return response.data;
            }

            return response;
        }

        if (response.problem) {
            // console.log(response, 'response');
            let data: any = response.data;
            throw new serviceError.NetWorkError(response.status ? response.status : 400, data.errorMessage || data.error ? data.errorMessage || data.error : response.problem as string)

        }
    }

    private async put<T>(request: KcApiRequest.IKCUpadteUsersRequestParams) {
        const endPoint = request.endpoint;
        const body = request.getBody();
        const params = request.getParams();
        let response = await this.instance.put<T>(endPoint, body, { params: params });

        if (response.ok) {


            if (response.data) {
                return response.data;
            }
            return response.status;
        }

        if (response.problem) {
            let data: any = response.data;
            throw new serviceError.NetWorkError(response.status ? response.status : 400, data.errorMessage || data.error ? data.errorMessage || data.error : response.problem as string)

        }
    }

    private async delete<T>(
        request: KcApiRequest.IKCRemoveUserRequestParams | KcApiRequest.IKCRemoveUserRoleFromUserRequestParams
    ) {
        const endPoint = request.endpoint;
        const body = request.getBody();
        const params = request.getParams();


        let response = await this.instance.delete<T>(endPoint, {}, { params: params, data: body });

        if (response.ok) {

            if (response.data) {
                return response.data;
            }

            return response.status;
        }


        if (response.problem) {
            let data: any = response.data;
            throw new serviceError.NetWorkError(response.status ? response.status : 400, data.errorMessage || data.error ? data.errorMessage || data.error : response.problem as string)
        }
    }


    public async createUser(body: KcApiRequest.CreateUserBody, realm: string) {
        try {
            const users = await this.post(new KcApiRequest.CreateUserRequest(realm, body));
            return users;
        } catch (error) {
            throw error;
        }
    }

    public async getUser(id: string, realm: string) {
        try {
            const user = await this.get(new KcApiRequest.GetUser(realm, id));
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async getAllUsers(realm: string) {
        try {
            const users = await this.get(new KcApiRequest.GetAllUsers(realm));
            return users;
        } catch (error) {

            throw error;
        }
    }

    public async updateUser(body: Object, id: string, realm: string) {
        try {
            const users = await this.put(new KcApiRequest.UpadteUsers(realm, body, id));
            return users;
        } catch (error) {
            throw error;
        }
    }

    public async removeUser(id: string, realm: string) {
        try {
            const users = await this.delete(new KcApiRequest.RomoveUserRequest(realm, id));
            return users;
        } catch (error) {
            throw error;
        }
    }

    public async assignRoleToUser(role: Array<KcApiRequest.AssignRoleToUserBody>, id: string, realm: string) {
        try {
            const roles = await this.post(new KcApiRequest.AssignRoleToUserRequest(realm, id, role));
            return roles;
        } catch (error) {
            throw error;
        }
    }

    public async getUserRolesById(id: string, realm: string) {
        try {
            const roles = await this.get(new KcApiRequest.GetUserRolesByIdRequest(realm, id));
            return roles;
        } catch (error) {
            throw error;
        }
    }

    public async removeRoleFromUser(payload: Array<KcApiRequest.AssignRoleToUserBody>, id: string, realm: string) {
        try {
            const roles = await this.delete(new KcApiRequest.RemoveUserRoleFromUserRequest(realm, id, payload));
            return roles;
        } catch (error) {
            throw error;
        }
    }

    public async getRole(id: string, realm: string) {
        try {
            const role = await this.get(new KcApiRequest.GetRoleById(realm, id));
            return role;
        } catch (error) {
            throw error;
        }
    }

    public async getAllRoles(realm: string) {
        try {
            const roles = await this.get(new KcApiRequest.GetRoles(realm));
            return roles;
        } catch (error) {
            throw error;
        }
    }


}