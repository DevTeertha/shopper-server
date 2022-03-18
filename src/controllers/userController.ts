import 'dotenv/config';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { order_collection, user_collection } from '../db/collections';
import { checkToken, generateToken } from '../functions/jwtAction';
import { IGetUserAuthInfoRequest, userDetailsI } from '../interfaces/Interface';
import { sendMailHandler } from '../functions/mailHandler';

const setToken = async (email: string, password: string) => {
    try {
        const user = await user_collection.findOne({ email: email });
        if (user) {
            const isValidPass: boolean = await bcrypt.compare(password, user.password);
            if (isValidPass) {
                const token: string = generateToken(user.name, user.email, user._id)
                return {
                    status: true,
                    token: token,
                    message: "Login successful"
                }
            } else {
                return {
                    status: false,
                    message: "Authentication Failed!"
                }
            }
        } else {
            return {
                status: false,
                message: "Authentication Failed!"
            }
        }

    } catch (error) {
        throw new Error("Something went wrong! Try Again!");
    }
}


export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await setToken(req.body.email, req.body.password);
    res.send(data);
}

export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await user_collection.findOne({ email: req.body.email });
        if (!user) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
            user_collection.insertOne(newUser);
            const data = await setToken(req.body.email, req.body.password);
            res.send(data);
        } else {
            res.status(401).json({
                status: false,
                message: "User already exist!"
            })
        }
    } catch (error) {
        throw new Error("Signup Failed!");
    }
}
export const userDetailsController: any = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = {
            name: req.name,
            email: req.email,
            userId: req.userId
        }
        const userDetails: userDetailsI = {
            status: true,
            user: user,
            message: 'Successfull!'
        }
        res.status(200).json(userDetails);
    } catch (error) {
        throw new Error("Something went wrong! Try Again!");
    }
}
export const getUserOrderListController: any = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = {
            name: req.name,
            email: req.email,
            userId: req.userId
        }
        order_collection.find({ user: user }).toArray((err: any, result: any) => {
            if (err) throw err;
            res.status(200).json(result);
        })
    } catch (error) {
        throw new Error("Something went wrong! Try Again!");
    }
}
export const placeOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: any = checkToken(req.body.userToken);
        if (user.name && user.email && user.userId) {
            const newUser = {
                name: user.name,
                email: user.email,
                userId: user.userId
            }
            const newOrder = {
                user: newUser,
                totalPrice: req.body.totalPrice,
                orderList: JSON.parse(req.body.OrderList),
                orderStatus: req.body.orderStatus,
                date: req.body.date
            }
            order_collection.insertOne(newOrder).then((response: any) => {
                sendMailHandler(user.email, "devteertha28@gmail.com", `New Order By ${user.name}`, `You have new order! Order ID: ${user.userId} .Please check your order list. https://shopper-client.vercel.app/admin/`)
                res.status(200).json({
                    status: true,
                    message: 'Order placed successfully!'
                });
            });
        } else {
            res.status(500).json({
                status: false,
                message: 'Failed to placed order!'
            });
        }
    } catch (error) {
        throw new Error("Something went wrong! Try Again!");
    }
}