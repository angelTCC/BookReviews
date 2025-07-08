
# 🎨 React Client – Book Review App

This is the frontend of the Book Review App built with **React**.

## 📄 Pages

- **Home**: Displays book list and current user (if logged)
- **Register**: Register a new user
- **Login**: Log in with existing credentials

## 📦 Tech

- React
- React Router
- Bootstrap
- `jwt-decode` to extract username from token

## 🔐 Auth Flow

- On login, token is saved to `localStorage`
- Username is extracted using `jwt-decode`
- Authenticated users can:
  - Add a review
  - Update their review
  - Delete their review

## 🚀 Start

```bash
cd client
npm install
npm run dev
```

## 🔧 Notes

This client assumes the backend runs at http://localhost:3000
Focus is on functionality, not design