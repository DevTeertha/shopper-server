import { Request } from "express"
export interface IGetUserAuthInfoRequest extends Request {
    name: string
    email: string,
    userId: string
}
export interface userDetailsI {
    status: boolean,
    user: {
        userId: string,
        email?: string,
        name?: string,
    },
    message: string
}
export interface orderListI {
    _id: string,
    productName: string,
    img: any,
    price: string,
    quantity: number,
    selectVariant: string
}