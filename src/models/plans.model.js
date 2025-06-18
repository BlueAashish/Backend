// models/plans.js
const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: String, required: true },
        duration: { type: String, required: true },
        features: { type: [String], required: true },
        status: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Plan", PlanSchema);