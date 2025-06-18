const express = require("express");
const router = express.Router();
const { auth, adminOnly } = require("../middleware/auth.middleware");
const { readingValidation } = require("../middleware/validation.middleware");
const {
  getAllReadings,
  getDeviceReadings,
  createReading,
} = require("../controllers/reading.controller");

router.get("/", [auth, adminOnly], getAllReadings);

router.get("/:deviceId", auth, getDeviceReadings);

router.post("/", [auth, readingValidation.create], createReading);

module.exports = router;
