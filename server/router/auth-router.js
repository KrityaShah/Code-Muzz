const express = require('express');
const router = express.Router();
const authController = require('../controller/auth-controller')



router.route("/").get(authController.home);
router.route("/register").post(authController.register);

module.exports = router;