const express = require("express");
const { createUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser, } = require("../controllers/userController");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

module.exports = router;
