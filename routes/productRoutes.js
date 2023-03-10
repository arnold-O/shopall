const express = require("express");
const { createProduct, getAllProduct, getProduct, updateProduct } = require("../controllers/productController");


const router = express.Router();


router.post("/create", createProduct);
router.get("/allproducts", getAllProduct);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);










module.exports = router;
