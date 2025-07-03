const express = require('express');
const app = express();

const genl_routers = require('./router/general.js').general;

app.use('/', genl_routers);

app.listen(3000, () => {
    console.log(`The server is lisening ...`)
})