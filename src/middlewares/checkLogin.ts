import 'dotenv/config';
import { NextFunction, Response } from "express";
var jwt = require('jsonwebtoken');

export const checkLogin = (req: any, res: Response, next: NextFunction): void => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email, userId, name } = decoded;
        req.name = name;
        req.email = email;
        req.userId = userId;
        next();
    } catch (error) {
        next('Authentication Failed!');
    }
}