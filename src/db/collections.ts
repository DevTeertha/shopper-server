import { client } from "./mongoConfig";
import 'dotenv/config';

export const user_collection = client.db('shopper_db').collection("users");
export const products_collection = client.db('shopper_db').collection("products");
export const order_collection = client.db('shopper_db').collection("orders");