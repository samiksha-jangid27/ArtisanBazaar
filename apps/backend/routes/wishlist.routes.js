const express = require("express");
const { protect } = require("../middlewares/protect");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlist.controller");

const router = express.Router();

// GET my wishlist
router.get("/", protect, getWishlist);

// ADD product to wishlist
router.post("/", protect, addToWishlist);

// REMOVE item from wishlist
router.delete("/:itemId", protect, removeFromWishlist);

module.exports = router;

