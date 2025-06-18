const { body } = require("express-validator");

const authValidation = {
  login: [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty(),
  ],
  register: [
    body("name").trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("role").optional().isIn(["admin", "client"]),
  ],
};

const productValidation = {
  create: [
    body("name").trim().notEmpty(),
    body("description").trim().notEmpty(),
    body("images").isArray().notEmpty(),
  ],
  update: [
    body("name").optional().trim().notEmpty(),
    body("description").optional().trim().notEmpty(),
    body("images").optional().isArray().notEmpty(),
  ],
};

const readingValidation = {
  create: [body("deviceId").notEmpty(), body("value").notEmpty()],
};

const userValidation = {
  update: [
    body("name").optional().trim().notEmpty(),
    body("email").optional().isEmail().normalizeEmail(),
    body("subscription").optional().isISO8601(),
  ],
};

const contactValidation = {
  submit: [
    body("name").trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("message").trim().notEmpty(),
  ],
};

module.exports = {
  authValidation,
  productValidation,
  readingValidation,
  userValidation,
  contactValidation,
};
