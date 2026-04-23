# Assinment PS Backend

Node.js + Express backend for the todo dashboard. It provides JWT-based authentication, cookie sessions, and protected todo CRUD routes backed by MongoDB and Mongoose.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- cookie-parser
- cors
- dotenv

## Features

- User signup, login, and logout
- Cookie-based JWT authentication
- Protected todo endpoints
- Create, read, update, and delete todos
- User-specific todo fetching
- CORS configured for the frontend app

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env`:
   ```env
   MONGO_URI="mongodb://127.0.0.1:27017/todo"
   JWT_SECRET="your_secret_here"
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Scripts

- `npm start` - run the backend server
- `npm run dev` - run the server with nodemon
- `npm run prisma:generate` - generate Prisma client if needed for Prisma-based work

## API Overview

Base path: `/api`

Auth routes:
- `POST /signup`
- `POST /login`
- `POST /logout`

Todo routes:
- `POST /createtodo`
- `GET /getusertodos`
- `PATCH /updatetodo/:id`
- `DELETE /deletetodo/:id`

## Notes

- The backend expects MongoDB to be available locally or via a valid Atlas connection string.
- The frontend should send requests with `credentials: "include"` so the auth cookie is preserved.
