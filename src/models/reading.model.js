const mongoose = require("mongoose");

const readingSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      index: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

readingSchema.index({ deviceId: 1, timestamp: -1 });

module.exports = mongoose.model("Reading", readingSchema);
