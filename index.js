const express = require('express')
const databaseConnect = require('./config/databaseConnection')
const dotenv = require('dotenv').config()


const app = express()


// Database conction Call
databaseConnect()


const PORT = process.env.PORT || 5000



app.listen(PORT , ()=>{
    console.log(`app running on Port ${PORT}`)
})