import mongoose from "mongoose";

export interface IUserModal {
    user_id?: string;
    email: string;
    password: string;
    salt: string;
    phone: string;
    userTypes: string
}

const userSchema = new mongoose.Schema({
    phone: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String,
    },
    userTypes: {
        type: String
    }
}, {
    timestamps: true, collection: 'awsuser'
})

export const UserModal = mongoose.model('awsuser', userSchema)
