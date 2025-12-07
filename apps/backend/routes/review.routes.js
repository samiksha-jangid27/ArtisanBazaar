const express = require("express");
const { protect } = require("../middlewares/protect");

const {
  addReview,
  editReview,
  deleteReview,
  getProductReviews,
} = require("../controllers/review.controller");

const router = express.Router();

// PUBLIC: read reviews
router.get("/:productId", getProductReviews);

// PRIVATE
router.post("/", protect, addReview);
router.patch("/:reviewId", protect, editReview);
router.delete("/:reviewId", protect, deleteReview);

module.exports = router;
