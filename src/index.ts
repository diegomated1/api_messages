// IMPORTS
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
const app = express();

// IMPORTING MIDDLEWARES
import {handle_auth} from './middlewares/auth.js';

// CONFIG
dotenv.config();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// ROUTER
import msg_router from './router/message.router.js';
import user_router from './router/user.router.js';
app.use('/api/user', user_router);
app.use('/api/', handle_auth, msg_router);

// LISTEN
app.listen(parseInt(process.env.API_PORT!), process.env.API_HOST!, ()=>{
    console.log(`Listen on http://${process.env.API_HOST}:${process.env.API_PORT}/`);
});
