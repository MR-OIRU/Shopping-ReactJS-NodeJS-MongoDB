// import

const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const cors = require('cors')

require('dotenv').config();


const router = require('./router/myRouter')
const server = express()

// use
server.use(morgan('dev'))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser()) 
server.use(session({
    secret: process.env.API_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

const url = process.env.API_URL_CORS;
server.use(cors({
    origin: url , credentials: true
}))

server.use(router)


// Start Server
const port = process.env.API_PORT
server.listen(port, () => console.log('Start Server successfully'))