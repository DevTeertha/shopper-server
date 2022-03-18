import 'dotenv/config';
const jwt = require('jsonwebtoken');
import { ObjectId } from 'mongodb';

const jwtConfig = {
    expiresIn: '1h'
}

export const generateToken = (name: string, email: string, id: ObjectId): string => {
    const token: string = jwt.sign({ name: name, email: email, userId: id }, process.env.JWT_SECRET, jwtConfig);
    return token;
}
export const checkToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET, function (err: any, decoded: Object) {
        if (err) {
            throw err;
        } else {
            return decoded;
        }
    });
}