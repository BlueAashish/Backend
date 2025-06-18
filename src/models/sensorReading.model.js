const mongoose = require("mongoose");
const BorewellCustomer = require("./borewellCustomer");

const dailyFlowSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    totalFlow: {
      type: Number,
      required: true,
    },
    readings: [
      {
        timestamp: Date,
        flow: Number,
      },
    ],
  },
  { _id: false }
);

const sensorReadingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    monitoringUnitId: {
      type: String,
      required: true,
    },
    sensorId: {
      type: String,
      required: true,
    },
    // Water Level Sensor
    waterLevel: {
      type: Number,
      default: null,
    },
    // Flowmeter
    totalFlow: {
      type: Number,
      default: null,
    },
    currentFlow: {
      type: Number,
      default: null,
    },
    // Daily Flow Data (stores last 365 days of flow data)
    dailyFlowData: [dailyFlowSchema],
    // Water Analyzer
    cod: {
      type: Number,
      default: null,
    },
    bod: {
      type: Number,
      default: null,
    },
    ph: {
      type: Number,
      default: null,
    },
    tds: {
      type: Number,
      default: null,
    },
    temperature: {
      type: Number,
      default: null,
    },
    ec: {
      type: Number,
      default: null,
    },
    toc: {
      type: Number,
      default: null,
    },
    tss: {
      type: Number,
      default: null,
    },
    turbidity: {
      type: Number,
      default: null,
    },
    chlorine: {
      type: Number,
      default: null,
    },
    dissolvedOxygen: {
      type: Number,
      default: null,
    },
    orp: {
      type: Number,
      default: null,
    },
    // Air Quality Monitor
    sox: {
      type: Number,
      default: null,
    },
    nox: {
      type: Number,
      default: null,
    },
    pm25: {
      type: Number,
      default: null,
    },
    pm10: {
      type: Number,
      default: null,
    },
    readingTimestamp: {
      type: Date,
      default: Date.now,
    },
    readingHistory: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for faster queries
sensorReadingSchema.index({ userId: 1, monitoringUnitId: 1, sensorId: 1 });
sensorReadingSchema.index({ readingTimestamp: -1 });
sensorReadingSchema.index({ "dailyFlowData.date": 1 });

// Pre-save middleware to automatically fetch userId from borewellCustomer
sensorReadingSchema.pre("save", async function (next) {
  try {
    if (this.isNew && this.monitoringUnitId) {
      const borewellCustomer = await BorewellCustomer.findOne({
        monitoringUnitId: this.monitoringUnitId,
      });

      if (!borewellCustomer) {
        throw new Error(
          `No borewell customer found with monitoringUnitId: ${this.monitoringUnitId}`
        );
      }

      this.userId = borewellCustomer.userId;
    }

    // Handle daily flow data if currentFlow is present
    if (this.currentFlow !== null) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find today's flow data or create new
      let todayFlowData = this.dailyFlowData.find(
        (d) => d.date.getTime() === today.getTime()
      );

      if (!todayFlowData) {
        // Remove oldest day if we have 365 days
        if (this.dailyFlowData.length >= 365) {
          this.dailyFlowData.sort((a, b) => a.date - b.date);
          this.dailyFlowData.shift();
        }

        todayFlowData = {
          date: today,
          totalFlow: 0,
          readings: [],
        };
        this.dailyFlowData.push(todayFlowData);
      }

      // Add current reading
      todayFlowData.readings.push({
        timestamp: new Date(),
        flow: this.currentFlow,
      });

      // Calculate total flow for the day
      todayFlowData.totalFlow = todayFlowData.readings.reduce(
        (sum, reading) => sum + reading.flow,
        0
      );
    }

    next();
  } catch (error) {
    next(error);
  }
});

const SensorReading = mongoose.model("SensorReading", sensorReadingSchema);

module.exports = SensorReading;
