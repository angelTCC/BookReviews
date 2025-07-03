const express = require('express');
const app = express();

let books = require('./booksdb');

const public_users = express.Router();

public_users.get('/', (req, res) => {
    res.send(JSON.stringify(books));
})

module.exports.general = public_users;