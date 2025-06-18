const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");
const { auth } = require("../middleware/auth.middleware");
const { authValidation } = require("../middleware/validation.middleware");
const { login, register } = require("../controllers/auth.controller");

router.post("/login", authValidation.login, login);

router.post("/register", authValidation.register, register);

module.exports = router;
