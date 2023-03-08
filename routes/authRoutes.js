const express = require("express");
const { createUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser, } = require("../controllers/userController");
const { protect, authorize } = require("../middlewares/authCheck");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", protect, authorize('admin'), getAllUsers);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
