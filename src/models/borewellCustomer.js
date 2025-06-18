const mongoose = require("mongoose");

const borewellCustomerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sensorName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sensor",
    required: true,
  },
  serialNo: {
    type: String,
    required: true,
  },
  installationDate: {
    type: Date,  // stored as Date
    required: true,
  },
  longitude: {
    type: String,
    // required: true,
  },
  latitude: {
    type: String,
    // required: true,
  },
  imeiNo: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  modelNo: {
    type: String,
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  monitoringUnitId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const BorewellCustomer = mongoose.model("BorewellCustomer", borewellCustomerSchema);

module.exports = BorewellCustomer;
