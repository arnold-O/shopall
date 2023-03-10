const express = require("express");
const { createUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser, blockUser, unBlockUser, logout, updatePassword, } = require("../controllers/userController");
const { protect, authorize } = require("../middlewares/authCheck");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", protect, authorize('admin'),  getAllUsers);
router.get("/:id", getSingleUser);
router.post("/logout", protect, logout);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.put("/blockuser/:id", protect, authorize('admin'), blockUser);
router.put("/unblockuser/:id", protect, authorize('admin'), unBlockUser);
router.patch("/updatepassword", protect, updatePassword);


module.exports = router;
