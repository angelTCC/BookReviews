const express = require('express');
let books = require('./booksdb');

const users = require('./auth_users.js').users;
const public_users = express.Router();

const doesExist = (username) => {
    const result = users.filter( user => user.username == username);
    if (result.length > 0) {
        return true
    } else {
        return false
    }
}

// Route: Get all books based on title
public_users.get('/', (req, res) => {
    res.send(JSON.stringify(books)); // return all books
})

public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const result = books.books[isbn];
    if (result === undefined) {
        return res.status(404).json('isbn not found');
    }
    res.json(books.books[isbn]);
})

public_users.get('/author/:author', (req, res) => {
    const author = req.params.author; // get the parameter author
    const arrayBooks = Object.values(books.books); // convert object to array

    // improve -> see capital letter, accents, space
    const result = arrayBooks.filter((book) => book.author === author); // applying filter to each book

    if (result.length === 0) {
        return res.status(404).send('No books found for this author')
    }
    res.status(200).json(result);
})

public_users.get('/title/:title', (req, res) => {
    const title = req.params.title;
    const arrayBooks = Object.values(books.books);
    const result = arrayBooks.filter(book => book.title === title);
    if (result.length === 0) {
        return res.status(404).send('No book found for this title')
    }
    res.status(200).json(result);    
})

public_users.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const result = books.books[isbn].reviews;
    if (result === undefined) {
        return res.status(404).send('isbn not found');
    }
    res.status(200).json(result);
})

// Route: Register a new user
public_users.post('/register', (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required" });
    }
    
    if (!doesExist(username)) {
        users.push({
            "username":username,
            "email": email,
            "password":password
        })
        console.log(JSON.stringify(users));
        return res.status(200).json({ message:  "username registered" })
    }
    
    res.status(400).json({ message: "choose other usarname!" });
    
});


module.exports.general = public_users;