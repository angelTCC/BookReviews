const express = require('express');
const jwt = require('jsonwebtoken');

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

// Route to handle user login
regd_users.post('/login', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    console.log(username);
    console.log(password);
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid credentials"});
    }

    const token = jwt.sign({ username: username }, "your_secret_key");
    
    res.status(400).json({ token: token});
})

// Route to add a book review for an authenticated user

module.exports.regd_users = regd_users;
module.exports.users = users;