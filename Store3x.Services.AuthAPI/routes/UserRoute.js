const express = require("express");
const router = express.Router();
const userController = require('../controller/UserController');
const asyncHandler = require('express-async-handler');

// GET all users
router.get("/allUser", asyncHandler(userController.getAllUsers));

// POST add user
router.post("/signUp", asyncHandler(userController.createNewUser));

// PUT update user
router.put("/updateUser/:email", asyncHandler(userController.updateUser));

// DELETE user
router.delete("/removeUser/:email", asyncHandler(userController.deleteUser));

module.exports = router;
