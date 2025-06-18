const express = require("express");
const router = express.Router();
const { auth, adminOnly } = require("../middleware/auth.middleware");
const { contactValidation } = require("../middleware/validation.middleware");
const {
  submitContact,
  getAllContacts,
} = require("../controllers/contact.controller");

router.post("/", contactValidation.submit, submitContact);

router.get("/", [auth, adminOnly], getAllContacts);

module.exports = router;
