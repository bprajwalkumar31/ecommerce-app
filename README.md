# E-commerce App

![Shop page](shop.png)

A full-stack e-commerce web app built with React, Node.js, Express and MongoDB.

## Status
Work in progress. Backend done, frontend coming next.

## Features (so far)
- Express REST API
- MongoDB Atlas database with Mongoose
- Product model and `GET/POST /api/products` routes
- Seed script with sample products

## Planned features
- React shop pages, search and categories
- Signup and login (JWT)
- Cart and checkout with Razorpay (test mode)
- Order history and admin page

## Run the backend
1. `cd server`
2. `npm install`
3. Create a `.env` file with `MONGO_URI=...` and `PORT=5000`
4. `node seed.js` (adds sample products)
5. `node index.js`
