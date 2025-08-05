const crypto = require("crypto");
const User = require("../models/user.model");
const { sendUserCredentials } = require("../utils/emailService");

const createUser = async (req, res) => {
  try {
    // Generate a random password
    const generatedPassword = crypto.randomBytes(8).toString("hex");

    const user = new User({
      ...req.body,
      password: generatedPassword,
      subscription: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    const savedUser = await user.save();

    const userDataForEmail = {
      name: savedUser.firstName
        ? `${savedUser.firstName} ${savedUser.lastName || ""}`.trim()
        : savedUser.email,
      email: savedUser.email,
      password: generatedPassword,
    };

    const emailResult = await sendUserCredentials(userDataForEmail);

    if (emailResult.success) {
      res.status(201).json({
        success: true,
        data: {
          ...savedUser.toObject(),
          password: undefined,
        },
        password: generatedPassword,
        emailSent: true,
        message: "User created successfully and credentials sent via email",
      });
    } else {
      res.status(201).json({
        success: true,
        data: {
          ...savedUser.toObject(),
        },
        password: generatedPassword, // Return original password for admin reference
        emailSent: false,
        emailError: emailResult.error,
        message: "User created successfully but email delivery failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
