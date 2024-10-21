const express = require('express');
const router = express.Router();
const authController = require('../controller/auth-controller')
const signupSchema = require('../validator/auth-validator');
const validate = require("../middleware/validate-middleware")



router.route("/").get(authController.home);
router.route("/register").post(validate(signupSchema), authController.register);
router.route("/login").post(authController.login);
router.route("/project").post(authController.projectCreation);
router.route("/project/:id").get(authController.getProjectById);
router.route("/project/:id").put(authController.updateProject);

module.exports = router;