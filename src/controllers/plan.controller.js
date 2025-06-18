// controllers/plansController.js

const plansModel = require("../models/plans.model");

exports.createPlan = async (req, res) => {
    try {
        const plan = await plansModel.create(req.body);
        res.status(201).json(plan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getPlans = async (req, res) => {
    try {
        const plans = await plansModel.find();
        res.json(plans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPlan = async (req, res) => {
    try {
        const plan = await plansModel.findById(req.params.id);
        if (!plan) return res.status(404).json({ error: "Plan not found" });
        res.json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePlan = async (req, res) => {
    try {
        const plan = await plansModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!plan) return res.status(404).json({ error: "Plan not found" });
        res.json(plan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletePlan = async (req, res) => {
    try {
        const plan = await plansModel.findByIdAndDelete(req.params.id);
        if (!plan) return res.status(404).json({ error: "Plan not found" });
        res.json({ message: "Plan deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};