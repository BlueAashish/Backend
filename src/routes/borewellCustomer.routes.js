const express = require("express");
const router = express.Router();
const {
  createBorewellCustomer,
  getBorewellCustomers,
  getBorewellCustomer,
  updateBorewellCustomer,
  deleteBorewellCustomer,
} = require("../controllers/borewellCustomer.controller");

// Create a new borewell customer
router.post("/", createBorewellCustomer);

// Get all borewell customers
router.get("/", getBorewellCustomers);

// Get single borewell customer
router.get("/:id", getBorewellCustomer);

// Update borewell customer
router.put("/:id", updateBorewellCustomer);

// Delete borewell customer
router.delete("/:id", deleteBorewellCustomer);

module.exports = router;
