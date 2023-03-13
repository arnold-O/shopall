const express = require("express");
const { createProduct, getAllProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { authorize, protect } = require("../middlewares/authCheck");


const router = express.Router();


router.post("/create", protect, authorize('admin'), createProduct);
router.get("/allproducts", getAllProduct);
router.get("/:id", getProduct);
router.patch("/:id",  protect, authorize('admin'), updateProduct);
router.delete("/:id", protect, authorize('admin'), deleteProduct);










module.exports = router;
