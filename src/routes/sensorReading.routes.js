const express = require("express");
const router = express.Router();
const { auth, adminOnly } = require("../middleware/auth.middleware");
const {
  createReading,
  getReadings,
  getReadingById,
  updateReading,
  deleteReading,
  getReadingsByMonitoringUnit,
  getLatestReading,
  getDailyFlowData,
  getAllReadingsByMonitoringUnitId,
  getReadingsByUser,
} = require("../controllers/sensorReading.controller.js");

// Create a new reading
router.post("/", createReading);

// Get all readings with optional filters
router.get("/", auth, adminOnly, getReadings);

// Get readings by monitoring unit ID
router.get("/monitoring-unit/:monitoringUnitId", getReadingsByMonitoringUnit);

// Get latest reading for a monitoring unit
router.get("/monitoring-unit/:monitoringUnitId/latest", getLatestReading);

// Get daily flow data for a monitoring unit
router.get("/monitoring-unit/:monitoringUnitId/daily-flow", getDailyFlowData);

// Get all readings for a given monitoringUnitId (POST, expects { monitoringUnitId } in body)
router.post("/all-by-monitoring-unit", getAllReadingsByMonitoringUnitId);

// Get all sensor readings for the logged-in user
router.get("/user/all", auth, getReadingsByUser);

// Get a single reading by ID
router.get("/:id", auth, getReadingById);

// Update a reading
router.put("/:id", auth, updateReading);

// Delete a reading
router.delete("/:id", auth, deleteReading);

module.exports = router;
