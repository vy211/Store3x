const Razorpay = require("razorpay");
//const dotenv = require("dotenv");
const crypto = require('crypto');
const instance = new Razorpay({
    key_id: 'rzp_test_xSDzoLnvm4FR57',
    key_secret: 'oi5rgzKZybOvIgaocSO3JVZX',
});

// Controller function to create a new payment order
exports.createOrder = async (req, res, next) => {
    const amount = req.body.amount; // You may pass amount from the frontend

    const options = {
        amount: amount * 100, // amount in paisa
        currency: "INR",
        receipt: "receipt_order_" + Math.random().toString(36).substring(7), // Generate a random receipt ID
    };

    try {
        const order = await instance.orders.create(options);
        res.json(order);
    } catch (err) {
        next(err); // Pass error to error handler middleware
    }
};

// Controller function to verify payment
exports.verifyPayment = async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', 'oi5rgzKZybOvIgaocSO3JVZX')
        .update(body.toString())
        .digest("hex");
    //console.log("sig", razorpay_signature);
    //console.log("expected", expectedSignature);
    const isSignatureValid = razorpay_signature === expectedSignature;
    if (isSignatureValid) {
        //database update


        res.redirect('http://localhost:3000/success');
    }
    else {
        res.status(400).json({ status: false });
        res.redirect('http://localhost:3000/address');
    }

};

exports.getKey = async (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};
