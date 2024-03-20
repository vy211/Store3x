const express = require("express");
const { route } = require("./Login");
const router = express.Router();


router.route('/')
    .post()

router.route('/refresh')
    .get()

router.route('/logout')
    .post()

module.exports = router