import { IsString, IsEmail, Length } from "class-validator";


export interface IKCCreateUserRequestParams {
    endpoint: string;
    getBody: () => Object;
    getParams: () => Object;
}


export class CreateUserBody {
    @IsString()
    username: string;
    @IsString()
    @Length(6, 30)
    password: string;
    lastName?: string;
    firstName?: string;
    @IsEmail()
    email: string;
    enabled?: boolean;
}
export class CreateUserRequest implements IKCCreateUserRequestParams {
    realm: string;
    body: CreateUserBody;
    constructor(realm: string, body: CreateUserBody) {
        this.realm = realm;
        this.body = body;
    }

    public get endpoint(): string {
        return `admin/realms/${this.realm}/users`;
    }

    getBody = (): Object => {
        return {
            username: this.body.username,
            firstName: this.body.firstName ? this.body.firstName : '',
            lastName: this.body.lastName ? this.body.lastName : '',
            enabled: true,
            emailVerified: true,
            email: this.body.email ? this.body.email : '',
            credentials: [{ value: this.body.password, temporary: false }],
            attributes: {},
            groups: []
        };
    };
    getParams = (): Object => {
        return {};
    };
}

export interface IKCGetUserRequestParams {
    endpoint: string;
    getParams: () => Object;
}
export class GetUser implements IKCGetUserRequestParams {
    realm: string;
    id: string;

    constructor(realm: string, id: string) {
        this.realm = realm;
        this.id = id;
    }

    public get endpoint(): string {
        return `admin/realms/${this.realm}/users/${this.id}`;
    }

    getParams = (): Object => {
        return {

        };
    };
}


export interface IKCGetAllUsersRequestParams {
    endpoint: string;
    getParams: () => Object;
}
export class GetAllUsers implements IKCGetAllUsersRequestParams {
    realm: string;
    constructor(realm: string) {
        this.realm = realm;
    }

    public get endpoint(): string {
        return `admin/realms/${this.realm}/users`;
    }
    getParams = (): Object => {
        return {};
    };
}

export interface IKCUpadteUsersRequestParams {
    endpoint: string;
    getBody: () => Object;
    getParams: () => Object;
}

interface IUpdateUserBody {
    username?: string;
    password?: string;
    lastName?: string;
    firstName?: string;
    email?: string;
    enabled?: boolean;
    credentials?: Array<Object>;
    emailVerified?: Boolean;
}

export class UpadteUsers implements IKCUpadteUsersRequestParams {
    realm: string;
    body: IUpdateUserBody;
    id: string;
    constructor(realm: string, body: IUpdateUserBody, id: string) {
        this.realm = realm;
        this.body = body;
        this.id = id;
    }

    public get endpoint(): string {
        return `admin/realms/${this.realm}/users/${this.id}`;
    }
    getBody = (): Object => {
        let template: IUpdateUserBody = {};

        if (this.body.username) {
            template.username = this.body.username;
        }
        if (this.body.firstName) {
            template.firstName = this.body.firstName;
        }
        if (this.body.lastName) {
            template.lastName = this.body.lastName;
        }
        if (this.body.email) {
            template.email = this.body.email;
        }
        if (this.body.enabled) {
            template.enabled = this.body.enabled;
        }
        if (this.body.emailVerified) {
            template.emailVerified = this.body.emailVerified;
        }
        if (this.body.password) {
            template.credentials = [{ value: this.body.password, temporary: false }];
        }

        return template;
    };
    getParams = (): Object => {
        return {};
    };
}


export interface IKCRemoveUserRequestParams {
    endpoint: string;
    getBody: () => Object;
    getParams: () => Object;
}
export class RomoveUserRequest implements IKCRemoveUserRequestParams {
    realm: string;
    id: string;
    constructor(realm: string, id: string) {
        this.realm = realm;
        this.id = id;
    }

    public get endpoint(): string {
        return `admin/realms/${this.realm}/users/${this.id}`;
    }
    getParams = (): Object => {
        return {};
    };
    getBody = (): Object => {
        return {};
    };
}



export interface IKCAssignRoleToUserParams {
    endpoint: string;
    getBody: () => Object;
    getParams: () => Object;
}

export interface AssignRoleToUserBody {
    clientRole: Boolean;
    composite: Boolean;
    name: string;
    description: string;
    containerId: string;
    id: string;
}
export class AssignRoleToUserRequest implements IKCAssignRoleToUserParams {
    realm: string;
    id: string;
    body: Array<AssignRoleToUserBody>;
    constructor(realm: string, id: string, body: Array<AssignRoleToUserBody>) {
        this.realm = realm;
        this.id = id;
        this.body = body;
    }

    public get endpoint(): string {
        return `admin/realms/${this.realm}/users/${this.id}/role-mappings/realm`;
    }
    getBody = (): Object => {

        const payload = []

        for (let x of this.body) {
            payload.push({
                clientRole: x.clientRole,
                composite: x.composite,
                name: x.name,
                description: x.description,
                containerId: x.containerId,
                id: x.id
            })
        }
        return payload
    };
    getParams = (): Object => {
        return {};
    };
}

export interface IKCGetUserRolesByIdRequestParams {
    endpoint: string;
    getParams: () => Object;
}
export class GetUserRolesByIdRequest implements IKCGetUserRolesByIdRequestParams {
    realm: string;
    id: string;
    constructor(realm: string, id: string) {
        this.realm = realm;
        this.id = id;
    }

    public get endpoint(): string {
        return `admin/realms/${this.realm}/users/${this.id}/role-mappings/realm/composite`;
    }
    getParams = (): Object => {
        return {};
    };
}

export interface IKCRemoveUserRoleFromUserRequestParams {
    endpoint: string;
    getBody: () => Object;
    getParams: () => Object;
}
export class RemoveUserRoleFromUserRequest implements IKCRemoveUserRoleFromUserRequestParams {
    realm: string;
    id: string;
    body: Array<AssignRoleToUserBody>;
    constructor(realm: string, id: string, body: Array<AssignRoleToUserBody>) {
        this.realm = realm;
        this.id = id;
        this.body = body;
    }

    public get endpoint(): string {
        return `admin/realms/${this.realm}/users/${this.id}/role-mappings/realm`;
    }
    getBody = (): Object => {
        const payload = []

        for (let x of this.body) {
            payload.push({
                clientRole: x.clientRole,
                composite: x.composite,
                name: x.name,
                description: x.description,
                containerId: x.containerId,
                id: x.id
            })
        }
        return payload
    };
    getParams = (): Object => {
        return {};
    };
}

export interface IKCGetRoleByIdRequestParams {
    endpoint: string;
    getParams: () => Object;
}
export class GetRoleById implements IKCGetRoleByIdRequestParams {
    realm: string;
    id: string;
    constructor(realm: string, id: string) {
        this.realm = realm;
        this.id = id;
    }

    public get endpoint(): string {
        return `admin/realms/${this.realm}/roles-by-id/${this.id}`;
    }

    getParams = (): Object => {
        return {};
    };
}

export interface IKCGetRolesRequestParams {
    endpoint: string;
    getParams: () => Object;
}
export class GetRoles implements IKCGetRolesRequestParams {
    realm: string;
    constructor(realm: string) {
        this.realm = realm;
    }

    public get endpoint(): string {
        return `admin/realms/${this.realm}/roles`;
    }
    getParams = (): Object => {
        return {};
    };
}