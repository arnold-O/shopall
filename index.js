const express = require('express')
const databaseConnect = require('./config/databaseConnection')
const dotenv = require('dotenv').config()
const app = express()

const authRouter = require('./routes/authRoutes')
const productRouter = require('./routes/productRoutes')
const globalErrorHandler = require("./middlewares/errorHandler");


// Database conction Call
databaseConnect()

// JSON DATA

// app.use(express.json())
app.use(express.json());

// ?Routes

app.use('/api/user', authRouter)
app.use('/api/product', productRouter)


// Globar error Handler
app.use(globalErrorHandler);




const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
    console.log(`app running on Port ${PORT}`)
})