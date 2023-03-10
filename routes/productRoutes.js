const express = require("express");
const { createProduct, getAllProduct, getProduct } = require("../controllers/productController");


const router = express.Router();


router.post("/create", createProduct);
router.get("/allproducts", getAllProduct);
router.get("/:id", getProduct);










module.exports = router;
