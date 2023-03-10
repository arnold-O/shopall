const Product = require('../models/productModel')
const asyncHandler = require('../utils/asynHandler')



const createProduct = asyncHandler (async(req, res, next)=>{

    const product = await Product.create(req.body)


    res.status(200).json({
        status:"success",
        product
    })



})




module.exports = {
    createProduct
}