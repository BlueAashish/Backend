const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensor.controller");

// Create a new sensor
router.post("/", sensorController.createSensor);

// Get all sensors
router.get("/", sensorController.getAllSensors);

// Get single sensor by ID
router.get("/:id", sensorController.getSensorById);

// Update sensor
router.put("/:id", sensorController.updateSensor);

// Delete sensor
router.delete("/:id", sensorController.deleteSensor);

module.exports = router;
