"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoles = exports.GetRoleById = exports.RemoveUserRoleFromUserRequest = exports.GetUserRolesByIdRequest = exports.AssignRoleToUserRequest = exports.RomoveUserRequest = exports.UpadteUsers = exports.GetAllUsers = exports.GetUser = exports.CreateUserRequest = exports.CreateUserBody = void 0;
const class_validator_1 = require("class-validator");
class CreateUserBody {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserBody.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 30),
    __metadata("design:type", String)
], CreateUserBody.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserBody.prototype, "email", void 0);
exports.CreateUserBody = CreateUserBody;
class CreateUserRequest {
    constructor(realm, body) {
        this.getBody = () => {
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
        this.getParams = () => {
            return {};
        };
        this.realm = realm;
        this.body = body;
    }
    get endpoint() {
        return `admin/realms/${this.realm}/users`;
    }
}
exports.CreateUserRequest = CreateUserRequest;
class GetUser {
    constructor(realm, id) {
        this.getParams = () => {
            return {};
        };
        this.realm = realm;
        this.id = id;
    }
    get endpoint() {
        return `admin/realms/${this.realm}/users/${this.id}`;
    }
}
exports.GetUser = GetUser;
class GetAllUsers {
    constructor(realm) {
        this.getParams = () => {
            return {};
        };
        this.realm = realm;
    }
    get endpoint() {
        return `admin/realms/${this.realm}/users`;
    }
}
exports.GetAllUsers = GetAllUsers;
class UpadteUsers {
    constructor(realm, body, id) {
        this.getBody = () => {
            let template = {};
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
        this.getParams = () => {
            return {};
        };
        this.realm = realm;
        this.body = body;
        this.id = id;
    }
    get endpoint() {
        return `admin/realms/${this.realm}/users/${this.id}`;
    }
}
exports.UpadteUsers = UpadteUsers;
class RomoveUserRequest {
    constructor(realm, id) {
        this.getParams = () => {
            return {};
        };
        this.getBody = () => {
            return {};
        };
        this.realm = realm;
        this.id = id;
    }
    get endpoint() {
        return `admin/realms/${this.realm}/users/${this.id}`;
    }
}
exports.RomoveUserRequest = RomoveUserRequest;
class AssignRoleToUserRequest {
    constructor(realm, id, body) {
        this.getBody = () => {
            const payload = [];
            for (let x of this.body) {
                payload.push({
                    clientRole: x.clientRole,
                    composite: x.composite,
                    name: x.name,
                    description: x.description,
                    containerId: x.containerId,
                    id: x.id
                });
            }
            return payload;
        };
        this.getParams = () => {
            return {};
        };
        this.realm = realm;
        this.id = id;
        this.body = body;
    }
    get endpoint() {
        return `admin/realms/${this.realm}/users/${this.id}/role-mappings/realm`;
    }
}
exports.AssignRoleToUserRequest = AssignRoleToUserRequest;
class GetUserRolesByIdRequest {
    constructor(realm, id) {
        this.getParams = () => {
            return {};
        };
        this.realm = realm;
        this.id = id;
    }
    get endpoint() {
        return `admin/realms/${this.realm}/users/${this.id}/role-mappings/realm/composite`;
    }
}
exports.GetUserRolesByIdRequest = GetUserRolesByIdRequest;
class RemoveUserRoleFromUserRequest {
    constructor(realm, id, body) {
        this.getBody = () => {
            const payload = [];
            for (let x of this.body) {
                payload.push({
                    clientRole: x.clientRole,
                    composite: x.composite,
                    name: x.name,
                    description: x.description,
                    containerId: x.containerId,
                    id: x.id
                });
            }
            return payload;
        };
        this.getParams = () => {
            return {};
        };
        this.realm = realm;
        this.id = id;
        this.body = body;
    }
    get endpoint() {
        return `admin/realms/${this.realm}/users/${this.id}/role-mappings/realm`;
    }
}
exports.RemoveUserRoleFromUserRequest = RemoveUserRoleFromUserRequest;
class GetRoleById {
    constructor(realm, id) {
        this.getParams = () => {
            return {};
        };
        this.realm = realm;
        this.id = id;
    }
    get endpoint() {
        return `admin/realms/${this.realm}/roles-by-id/${this.id}`;
    }
}
exports.GetRoleById = GetRoleById;
class GetRoles {
    constructor(realm) {
        this.getParams = () => {
            return {};
        };
        this.realm = realm;
    }
    get endpoint() {
        return `admin/realms/${this.realm}/roles`;
    }
}
exports.GetRoles = GetRoles;
//# sourceMappingURL=users.js.map