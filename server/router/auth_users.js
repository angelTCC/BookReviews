const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");

let users = [];

const regd_users = express.Router();

// Function to check if a username and password match the records
const authenticatedUser = (username, password) => {
    const user = users.find(user => user.username === username);
    if (!user) {
        return false;
    }
    // Check if the provided password matches the stored password for the user
    // You should implement proper password hashing and comparison here
    // For demonstration purposes, we are comparing passwords directly (not recommended in production)
    if (user.password === password) {
        return true;
    }
    return false;
};

// authentication process
function authMiddleware (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({message: 'token missing'});
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, "your_secret_key");
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).send('Invalid or expired token');
    }
}

// Route to handle user login
regd_users.post('/login', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid credentials"});
    }

    const token = jwt.sign({ username: username }, "your_secret_key");
    
    res.status(200).json({ token: token});
})

// Route to add a book review for an authenticated user
regd_users.put('/auth/review/:isbn', authMiddleware, (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;

    const result = books.books[isbn];
    if (result === undefined) {
        return res.status(404).json('isbn not found');
    }

    books.books[isbn].reviews[req.user.username] = review;
    res.status(200).json({ message: "Review added"});
})

// Delete book review
regd_users.delete('/auth/review/:isbn', authMiddleware, (req, res) => {
    const isbn = req.params.isbn;
    const user = req.user.username;

    const result = books.books[isbn];
    if (!result) return res.status(404).json({message: 'book not found'});
    if (!result.reviews[user]) return res.status(404).json({message: 'user review not found'});

    delete result.reviews[req.user.username];
    res.status(200).json({message: 'delte review sucess'});
})

module.exports.regd_users = regd_users;
module.exports.users = users;
