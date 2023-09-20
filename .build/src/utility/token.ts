import { IUserModal } from '../api/user/model/schema/UserModal';
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'jwt';

export const generateToken = (data: IUserModal) => {
    return jwt.sign({ data }, JWT_SECRET, { expiresIn: '30d' })
}

export const verifyToken = async (token: string): Promise<IUserModal | false> => {
    try {
        if (token) {
            const payload = await jwt.verify(token.split(' ')[1], JWT_SECRET)
            return payload as IUserModal
        }
        return false
    } catch (error) {
        return false
    }
}