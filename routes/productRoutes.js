const express = require("express");
const { createProduct } = require("../controllers/productController");


const router = express.Router();


router.post("/register", createProduct);










module.exports = router;
