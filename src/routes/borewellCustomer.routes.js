const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth.middleware");
const {
  createBorewellCustomer,
  getBorewellCustomers,
  getBorewellCustomer,
  getBorewellCustomersByUser,
  updateBorewellCustomer,
  deleteBorewellCustomer,
} = require("../controllers/borewellCustomer.controller.js");

// Create a new borewell customer
router.post("/", createBorewellCustomer);

// Get all borewell customers
router.get("/", getBorewellCustomers);

// Get borewell customers for logged-in user
router.get("/user", auth, getBorewellCustomersByUser);

// Get single borewell customer (ObjectId only)
router.get("/:id([0-9a-fA-F]{24})", getBorewellCustomer);

// Update borewell customer
router.put("/:id([0-9a-fA-F]{24})", updateBorewellCustomer);

// Delete borewell customer
router.delete("/:id([0-9a-fA-F]{24})", deleteBorewellCustomer);

module.exports = router;
