const express = require('express');
const router = express.Router();
const authController = require('../controller/auth-controller')



// router.route("/").get((req, res) =>{
//     res
//     .status(200)
//     .send("welcome to Homepage using router");
// })


router.route("/").get(authController.home);

module.exports = router;