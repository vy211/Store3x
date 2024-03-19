const express = require("express");
const router = express.Router();
const userController = require('../controller/UserController');
const asyncHandler = require('express-async-handler');

// Define routes
router.get("/allUser", asyncHandler(userController.getAllUsers));
router.post("/signUp", asyncHandler(userController.createNewUser));
router.put("/updateUser/:email", asyncHandler(userController.updateUser));
router.delete("/removeUser/:email", asyncHandler(userController.deleteUser));

module.exports = router;
