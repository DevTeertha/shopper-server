import { MongoClient } from 'mongodb';
import 'dotenv/config';
export interface ProcessEnv {
    [key: string]: string | undefined
}
const username = process.env["DB_USERNAME"];
const password = process.env["DB_PASSWORD"];

const uri = `mongodb+srv://${username}:${password}@cluster0.9ekwx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
export const client = new MongoClient(uri);