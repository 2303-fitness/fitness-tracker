require("dotenv").config()
const express = require("express");
const router = require('./api');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const  client  = require('./db/client');
client.connect();


// Setup your Middleware and API Router here
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', router);




module.exports = app;
