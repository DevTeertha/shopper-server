import { NextFunction, Request, Response } from "express";
import { products_collection } from "../db/collections";
import { convertImageToBase64 } from "../functions/convertImageToBase64";
import { ObjectId } from 'mongodb';

export const getProductsController = async (req: Request, res: Response, next: NextFunction) => {
    products_collection.find({}).toArray((err: any, doc: any) => {
        res.send(doc);
    });

}

export const addProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const img = convertImageToBase64(req.files);
        const newProduct = {
            productName: req.body.productName,
            description: req.body.description,
            stock: parseInt(req.body.stock),
            variant: JSON.parse(req.body.variant),
            img
        }
        products_collection.insertOne(newProduct);
        res.status(200).json({
            status: true,
            message: 'Product successfully added!'
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to add product!'
        });
    }
}
export const editProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newQuery = { _id: new ObjectId(req.body._id) }
        const newValue = {
            $set: {
                productName: req.body.productName,
                description: req.body.description,
                stock: req.body.stock,
                variant: JSON.parse(req.body.variant)
            }
        }
        products_collection.updateOne(newQuery, newValue).then(response => {
            console.log(response.modifiedCount);
            res.status(200).json({
                status: true,
                message: 'Product Updated Successfully!'
            });
        })
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            status: false,
            message: 'Failed to update product!'
        });
    }
}
export const deleteProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.body.productId;
        const result = await products_collection.deleteOne({ _id: new ObjectId(productId) });
        if (result.deletedCount > 0) {
            res.status(200).json({
                status: true,
                message: `ProductId: ${productId} Has been deleted!`
            });
        }
    } catch (error) {
        console.log("error: ", error)
        res.status(500).json({
            status: false,
            message: 'Failed to delete product!'
        });
    }
}