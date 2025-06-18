// routes/plansRoutes.js
const { createPlan, getPlans, getPlan, updatePlan, deletePlan } = require("../controllers/plan.controller");


const express = require("express");
const router = express.Router();

router.post("/", createPlan);
router.get("/", getPlans);
router.get("/:id", getPlan);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

module.exports = router;