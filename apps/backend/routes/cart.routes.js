const express = require("express");
const { protect } = require("../middlewares/protect");

const {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
} = require("../controllers/cart.controller");

const router = express.Router();

// Get my cart
router.get("/", protect, getCart);

// Add to cart
router.post("/", protect, addToCart);

// Update quantity
router.patch("/:itemId", protect, updateQuantity);

// Remove item
router.delete("/:itemId", protect, removeItem);

// Clear entire cart
router.delete("/", protect, clearCart);

module.exports = router;
