const { validationResult } = require("express-validator");
const authService = require("../services/auth.service");
const AppError = require("../utils/AppError");
const crypto = require("crypto");
const User = require("../models/user.model");

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      // Send only error message to frontend
      return res.status(400).json({ success: false, message: "Validation Error" });
    }

    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    // Send only error message to frontend
    res.status(401).json({ success: false, message: error.message || "Login failed" });
  }
};

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError("Validation Error", 400);
    }

    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
