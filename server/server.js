
const express = require('express');
const morgan = require('morgan')
const server = express();

require('dotenv').config();

server.use(morgan('dev'))
server.use(express.json());

const port = process.env.API_PORT
server.listen(port,()=>{
    console.log('Start Server successfully')
})