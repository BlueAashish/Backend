const BorewellCustomer = require("../models/borewellCustomer");
const Sensor = require("../models/sensor.model");


const createBorewellCustomer = async (req, res) => {
  try {
    const { sensorName, ...rest } = req.body;

    const sensor = await Sensor.findById(sensorName);
    if (!sensor) {
      return res.status(404).json({ success: false, error: "Sensor not found" });
    }
    const typePrefix = sensor.type.slice(0, 2).toUpperCase();

    const lastCustomer = await BorewellCustomer.findOne({
      monitoringUnitId: { $regex: `^${typePrefix}\\d{3}$` }
    })
      .sort({ monitoringUnitId: -1 })
      .lean();

    let nextNumber = 1;
    if (lastCustomer && lastCustomer.monitoringUnitId) {
      const lastNum = parseInt(lastCustomer.monitoringUnitId.slice(2), 10);
      if (!isNaN(lastNum)) {
        nextNumber = lastNum + 1;
      }
    }

    const number = String(nextNumber).padStart(3, "0");
    const monitoringUnitId = `${typePrefix}${number}`;

    const borewellCustomer = new BorewellCustomer({
      sensorName,
      monitoringUnitId,
      ...rest,
    });

    await borewellCustomer.save();
    res.status(201).json({
      success: true,
      data: borewellCustomer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const getBorewellCustomers = async (req, res) => {
  try {
    const borewellCustomers = await BorewellCustomer.find().populate(
      "userId",
      "-password"
    ).populate("sensorName");
    res.status(200).json({
      success: true,
      count: borewellCustomers.length,
      data: borewellCustomers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single borewell customer by ID
const getBorewellCustomer = async (req, res) => {
  try {
    const borewellCustomer = await BorewellCustomer.findById(
      req.params.id
    ).populate("userId", "-password");
    if (!borewellCustomer) {
      return res.status(404).json({
        success: false,
        error: "Borewell customer not found",
      });
    }
    res.status(200).json({
      success: true,
      data: borewellCustomer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update borewell customer
const updateBorewellCustomer = async (req, res) => {
  try {
    const borewellCustomer = await BorewellCustomer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("userId", "-password");

    if (!borewellCustomer) {
      return res.status(404).json({
        success: false,
        error: "Borewell customer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: borewellCustomer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete borewell customer
const deleteBorewellCustomer = async (req, res) => {
  try {
    const borewellCustomer = await BorewellCustomer.findByIdAndDelete(
      req.params.id
    );
    if (!borewellCustomer) {
      return res.status(404).json({
        success: false,
        error: "Borewell customer not found",
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
  createBorewellCustomer,
  getBorewellCustomers,
  getBorewellCustomer,
  updateBorewellCustomer,
  deleteBorewellCustomer,
};
