const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const authController = require('../controller/AuthController');

router.post('/login', asyncHandler(authController.login));
router.get('/refresh', asyncHandler(authController.refresh));
router.post('/logout', asyncHandler(authController.logout));

module.exports = router;
