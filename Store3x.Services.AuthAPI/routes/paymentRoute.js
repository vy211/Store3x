const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");

// Define routes for payment
router.post("/createOrder", paymentController.createOrder);
router.post("/verifyPayment", paymentController.verifyPayment);
router.get("/key", paymentController.getKey);

module.exports = router;
