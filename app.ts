import bodyParser from 'body-parser';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import productRouter from './src/routes/productRouter';
import { client } from './src/db/mongoConfig';
import userRouter from './src/routes/userRouter';
import { errorHandler } from './src/middlewares/errorHandler';
import orderRouter from './src/routes/orderRouter';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

client.connect(() => {
    app.get("/", (req: Request, res: Response) => {
        res.send("Server Running!");
    })
    app.use('/api/orders', orderRouter);
    app.use('/api/products', productRouter);
    app.use('/api/user', userRouter);
    console.log("DB Connected!");
});

app.use(errorHandler);
app.listen(PORT);
