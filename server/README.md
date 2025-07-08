

# 🔧 Express Server – Book Review App

This is the backend server using **Express.js** to handle routes, authentication, and book reviews.

## 🛠 Tech Stack

- Express
- JSON Web Tokens (JWT)
- CORS

## 📁 Main Files

- `index.js`: Main server entry
- `router/general.js`: Public routes (register, list books)
- `router/auth_users.js`: Authenticated routes (login, add/update/delete review)

## 🔐 Auth Details

- Register users with username, email, and password
- Use JWT for login; token includes `{ username }`
- Auth middleware checks token on protected routes

## 📦 Endpoints Overview

### Public (`/`)
- `GET /` → list books
- `POST /register` → register user

### Authenticated (`/customer`)
- `POST /login` → log in and return JWT
- `PUT /auth/review/:isbn` → add/update review
- `DELETE /auth/review/:isbn` → delete review

## 🚀 Start Server

```bash
cd server
npm install
node index.js
```

Server runs at: http://localhost:3000