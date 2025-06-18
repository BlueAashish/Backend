const { validationResult } = require("express-validator");
const Reading = require("../models/reading.model");
const BorewellCustomer = require("../models/borewellCustomer");

const getAllReadings = async (req, res) => {
  try {
    const readings = await Reading.find().sort({ timestamp: -1 }).limit(100);
    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getDeviceReadings = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { startDate, endDate } = req.query;

    const query = { deviceId };
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const readings = await Reading.find(query)
      .sort({ timestamp: -1 })
      .limit(100);

    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createReading = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the customer by monitoringUnitId
    const { monitoringUnitId, value, deviceId, timestamp } = req.body;
    const customer = await BorewellCustomer.findOne({ monitoringUnitId });
    if (!customer) {
      return res.status(404).json({ message: "Borewell customer not found" });
    }

    // Calculate todayFlow = TOT - currentFlow
    // Assume value.TOT and value.currentFlow are provided in the reading
    let todayFlow = null;
    if (value && value.TOT != null && value.currentFlow != null) {
      todayFlow = value.TOT - value.currentFlow;
    }

    // Prepare the reading document
    const reading = new Reading({
      deviceId: deviceId,
      value: { ...value, todayFlow },
      timestamp: timestamp || new Date(),
      // Optionally, you can add userId or monitoringUnitId if you extend the schema
    });

    await reading.save();
    res.status(201).json(reading);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllReadings,
  getDeviceReadings,
  createReading,
};
