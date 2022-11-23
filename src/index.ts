// IMPORTS
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const app = express();

// CONFIG
dotenv.config();
app.use(express.json());
app.use(morgan('dev'));

// ROUTER

// LISTEN
app.listen(process.env.API_PORT, process.env.API_HOST, ()=>{
    console.log(`Listen on http://${process.env.API_HOST}:${process.env.API_PORT}/`);
});
