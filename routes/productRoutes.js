const express = require("express");
const { createProduct, getAllProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/productController");


const router = express.Router();


router.post("/create", createProduct);
router.get("/allproducts", getAllProduct);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);










module.exports = router;
