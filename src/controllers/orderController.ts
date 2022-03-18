import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { order_collection, products_collection } from "../db/collections";
import { orderListI } from "../interfaces/Interface";


export const getOrderController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        order_collection.find({}).toArray((err: any, doc: any) => {
            res.send(doc);
        });
    } catch (error) {
        return error;
    }
}

export const changeOrderStatusController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.body.orderId;
        const orderList = JSON.parse(req.body.orderList);
        const orderStatus = req.body.orderStatus;

        // Order status SET
        const newOrderQuery = { _id: new ObjectId(orderId) }
        const orderStatusNewValue = {
            $set: {
                orderStatus,
            }
        }
        if (orderStatus === 'delivered') {
            // Product Quantity Update Process
            orderList.map(async (list: orderListI) => {
                const { _id, quantity } = list;
                const productIDQuery = { _id: new ObjectId(_id) }; //Product ID
                const currentProduct: any = await products_collection.findOne(productIDQuery);
                if (currentProduct.stock > 0) {
                    const newQuantitySet = {
                        $set: {
                            stock: currentProduct.stock - quantity,
                        }
                    }
                    products_collection.updateOne(productIDQuery, newQuantitySet).then((response: any) => {
                        if (response.modifiedCount > 0) {

                            // Order status update process
                            order_collection.updateOne(newOrderQuery, orderStatusNewValue).then((orderRes: any) => {
                                if (orderRes.modifiedCount > 0) {
                                    res.status(200).json({
                                        status: true,
                                        message: "Product has been delivered"
                                    })
                                } else {
                                    res.status(500).json({
                                        status: false,
                                        message: "Something went wrong! please try again!"
                                    })
                                }
                            }).catch((err: any) => {
                                throw err;
                            })


                        } else {
                            res.status(500).json({
                                status: false,
                                message: "Something went wrong! please try again!"
                            })
                        }
                    }).catch(err => {
                        throw err
                    })
                } else {
                    res.status(500).json({
                        status: false,
                        message: "The product is out of stock"
                    })
                }
            });

        } else if (orderStatus === 'shipped') {
            order_collection.updateOne(newOrderQuery, orderStatusNewValue).then((orderRes: any) => {
                if (orderRes.modifiedCount > 0) {
                    res.status(200).json({
                        status: true,
                        message: "Product Shipped"
                    })
                } else {
                    res.status(500).json({
                        status: false,
                        message: "Something went wrong! please try again!"
                    })
                }
            }).catch((err: any) => {
                throw err;
            })
        } else {
            order_collection.updateOne(newOrderQuery, orderStatusNewValue).then((orderRes: any) => {
                if (orderRes.modifiedCount > 0) {
                    res.status(200).json({
                        status: true,
                        message: "Order Processing"
                    })
                } else {
                    res.status(500).json({
                        status: false,
                        message: "Something went wrong! please try again!"
                    })
                }
            }).catch((err: any) => {
                throw err;
            })
        }
    } catch (error) {
        return error;
    }
}