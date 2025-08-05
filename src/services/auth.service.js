const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const bcryptjs = require("bcryptjs");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  console.log("User found:", user);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  console.log("Comparing password:", password);
  console.log("User password:", user.password);
  const hashedPassword = await bcryptjs.hash(password, 10);

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    console.log("fail");
    throw new AppError("Invalid credentials", 401);
  }
  // Ensure the user object has a comparePassword method

  const token = generateToken(user._id);
  console.log(token);

  return {
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  };
};

const register = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError("Email already registered", 400);
  }

  const user = new User({
    ...userData,
    subscription: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  await user.save();

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = {
  login,
  register,
};
