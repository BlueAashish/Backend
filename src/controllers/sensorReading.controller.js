const SensorReading = require("../models/sensorReading.model");
const BorewellCustomer = require("../models/borewellCustomer");

// Create a new sensor reading
exports.createReading = async (req, res) => {
  try {
    const { monitoringUnitId, sensorId } = req.body;
    let readingDoc = await SensorReading.findOne({ monitoringUnitId, sensorId });

    if (readingDoc) {
      const oldReading = { ...readingDoc._doc };
      delete oldReading._id;
      delete oldReading.__v;
      delete oldReading.updatedAt;
      delete oldReading.readingHistory;

      if (!readingDoc.readingHistory) readingDoc.readingHistory = [];
      readingDoc.readingHistory.push(JSON.stringify(oldReading));

      Object.assign(readingDoc, req.body, { readingTimestamp: new Date() });
      await readingDoc.save();
      res.status(200).json({ success: true, data: readingDoc });
    } else {
      const borewellCustomer = await BorewellCustomer.findOne({
        monitoringUnitId,
      });
      if (!borewellCustomer) {
        return res.status(404).json({
          success: false,
          error: "Monitoring unit not found",
        });
      }
      const userId=borewellCustomer.userId; 
      const newReading = new SensorReading({ ...req.body, readingHistory: [],userId });
      await newReading.save();
      res.status(201).json({ success: true, data: newReading });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all readings with optional filters
exports.getReadings = async (req, res) => {
  try {
    const { monitoringUnitId, sensorId, startDate, endDate } = req.query;

    // Build filter object
    const filter = {};
    if (monitoringUnitId) filter.monitoringUnitId = monitoringUnitId;
    if (sensorId) filter.sensorId = sensorId;

    // Add date range if provided
    if (startDate || endDate) {
      filter.readingTimestamp = {};
      if (startDate) filter.readingTimestamp.$gte = new Date(startDate);
      if (endDate) filter.readingTimestamp.$lte = new Date(endDate);
    }

    const readings = await SensorReading.find(filter)
      .sort({ readingTimestamp: -1 })
      .populate("userId", "name email"); // Populate user details if needed

    res.status(200).json({
      success: true,
      count: readings.length,
      data: readings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get a single reading by ID
exports.getReadingById = async (req, res) => {
  try {
    const reading = await SensorReading.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!reading) {
      return res.status(404).json({
        success: false,
        error: "Reading not found",
      });
    }

    res.status(200).json({
      success: true,
      data: reading,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update a reading
exports.updateReading = async (req, res) => {
  try {
    const reading = await SensorReading.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!reading) {
      return res.status(404).json({
        success: false,
        error: "Reading not found",
      });
    }

    res.status(200).json({
      success: true,
      data: reading,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete a reading
exports.deleteReading = async (req, res) => {
  try {
    const reading = await SensorReading.findByIdAndDelete(req.params.id);

    if (!reading) {
      return res.status(404).json({
        success: false,
        error: "Reading not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get readings by monitoring unit ID
exports.getReadingsByMonitoringUnit = async (req, res) => {
  try {
    const { monitoringUnitId } = req.params;
    const { startDate, endDate, limit = 100 } = req.query;

    // Verify monitoring unit exists
    const borewellCustomer = await BorewellCustomer.findOne({
      monitoringUnitId,
    });
    if (!borewellCustomer) {
      return res.status(404).json({
        success: false,
        error: "Monitoring unit not found",
      });
    }

    // Build filter
    const filter = { monitoringUnitId };
    if (startDate || endDate) {
      filter.readingTimestamp = {};
      if (startDate) filter.readingTimestamp.$gte = new Date(startDate);
      if (endDate) filter.readingTimestamp.$lte = new Date(endDate);
    }

    const readings = await SensorReading.find(filter)
      .sort({ readingTimestamp: -1 })
      .limit(parseInt(limit))
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      count: readings.length,
      data: readings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get latest reading for a monitoring unit
exports.getLatestReading = async (req, res) => {
  try {
    const { monitoringUnitId } = req.params;

    const reading = await SensorReading.findOne({ monitoringUnitId })
      .sort({ readingTimestamp: -1 })
      .populate("userId", "name email");

    if (!reading) {
      return res.status(404).json({
        success: false,
        error: "No readings found for this monitoring unit",
      });
    }

    res.status(200).json({
      success: true,
      data: reading,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get daily flow data for a monitoring unit
exports.getDailyFlowData = async (req, res) => {
  try {
    const { monitoringUnitId } = req.params;
    const { startDate, endDate } = req.query;

    // Verify monitoring unit exists
    const borewellCustomer = await BorewellCustomer.findOne({
      monitoringUnitId,
    });
    if (!borewellCustomer) {
      return res.status(404).json({
        success: false,
        error: "Monitoring unit not found",
      });
    }

    // Build date filter
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter["dailyFlowData.date"] = {};
      if (startDate)
        dateFilter["dailyFlowData.date"].$gte = new Date(startDate);
      if (endDate) dateFilter["dailyFlowData.date"].$lte = new Date(endDate);
    }

    const readings = await SensorReading.findOne(
      {
        monitoringUnitId,
        ...dateFilter,
      },
      { dailyFlowData: 1 }
    );

    if (
      !readings ||
      !readings.dailyFlowData ||
      readings.dailyFlowData.length === 0
    ) {
      return res.status(404).json({
        success: false,
        error: "No flow data found for the specified period",
      });
    }

    // Sort daily flow data by date
    const sortedFlowData = readings.dailyFlowData.sort(
      (a, b) => a.date - b.date
    );

    res.status(200).json({
      success: true,
      count: sortedFlowData.length,
      data: sortedFlowData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all readings for a given monitoringUnitId
exports.getAllReadingsByMonitoringUnitId = async (req, res) => {
  try {
    const { monitoringUnitId } = req.body;
    if (!monitoringUnitId) {
      return res.status(400).json({
        success: false,
        error: "monitoringUnitId is required in the request body",
      });
    }
    const readings = await SensorReading.find({ monitoringUnitId }).sort({ readingTimestamp: -1 });
    res.status(200).json({
      success: true,
      count: readings.length,
      data: readings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all sensor readings for the logged-in user
exports.getReadingsByUser = async (req, res) => {
  try {
    const userId = req.user._id; // Set by auth middleware
    const readings = await SensorReading.find({ userId }).sort({ readingTimestamp: -1 });
    res.status(200).json({
      success: true,
      count: readings.length,
      data: readings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
