const express = require("express");
const { protect } = require("../middlewares/protect");
const { authorizeRoles } = require("../middlewares/roles");

const {
  createOrder,
  getMyOrders,
  getOrderDetails,
  getAllOrders,
} = require("../controllers/order.controller");

const router = express.Router();

// USER
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:orderId", protect, getOrderDetails);

// ADMIN
router.get("/", protect, authorizeRoles("ADMIN"), getAllOrders);

module.exports = router;
