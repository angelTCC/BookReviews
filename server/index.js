const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors()); // ✅ Allow cross-origin requests

const genl_routers = require('./router/general.js').general;
const customer_routes = require('./router/auth_users.js').regd_users;

app.use(express.json());

app.use('/', genl_routers);
app.use('/customer', customer_routes);

app.listen(3000, () => {
    console.log(`The server is lisening ...`)
})