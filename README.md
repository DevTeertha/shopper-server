# Shopper (Server)

REST API for **Shopper**, a full-stack e-commerce app. Handles users, authentication, products and orders, and emails the admin when a new order comes in.

Frontend: [shopper-client](https://github.com/DevTeertha/shopper-client) (Next.js + Redux).

## Features

- **Register / login** with bcrypt password hashing and **JWT** tokens
- `checkLogin` middleware that protects user routes
- **Products** CRUD, including image upload (stored as base64)
- **Orders**: customers place orders and see their own order list; admins list all orders and change status
- **Email notification** to the admin on every new order (Nodemailer)
- Central error-handling middleware

## Tech stack

Node.js · Express · TypeScript · MongoDB (native driver) · JSON Web Token · bcrypt · Nodemailer · express-fileupload

## API overview

| Router | Endpoints |
|---|---|
| Users (`/api/user`) | `POST /register`, `POST /login`, `GET /userDetails` 🔒, `POST /placeOrder`, `GET /getOrderList` 🔒 |
| Products (`/api/products`) | `GET /getProducts`, `POST /addProduct`, `PUT /editProduct`, `DELETE /deleteProduct` |
| Orders (`/api/orders`) | `GET /getAllOrders`, `PUT /changeStatus` |

🔒 = requires a valid JWT

## Project structure

```
app.ts                 # Express app setup
src/
├── routes/            # user, product, order routers
├── controllers/       # request handlers
├── middlewares/       # checkLogin (JWT), errorHandler
├── functions/         # JWT helpers, mail handler, image conversion
├── db/                # MongoDB client + collections
└── interfaces/
```

## Getting started

```bash
npm install
```

Create a `.env` file:

```env
DB_USERNAME=your_mongodb_user
DB_PASSWORD=your_mongodb_password
JWT_SECRET=a_long_random_secret
```

```bash
npm run dev     # nodemon + ts-node
npm run build   # compile TypeScript
npm start
```
