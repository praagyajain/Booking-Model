const express = require("express");
const { registerUser, loginUser, currentUser, getAllUsers } = require("../controller/userController");
const { validateToken } = require("../middleware/Auth");



const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/profile", validateToken ,currentUser)

router.get("/allusers",getAllUsers)


module.exports = router;