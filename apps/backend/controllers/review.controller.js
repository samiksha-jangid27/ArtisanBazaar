const { prisma } = require("../config/database");

// ---------------- ADD REVIEW ----------------
async function addReview(req, res) {
  try {
    const userId = req.user.id;
    const { productId, rating, comment } = req.body;

    if (!productId || !rating) {
      return res.status(400).json({ ERROR: "productId and rating required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ ERROR: "Rating must be between 1–5" });
    }

    // ensure product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ ERROR: "Product not found" });

    // ensure user purchased product before reviewing
    const purchased = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId,
          paymentStatus: "PAID",
        },
      },
    });

    if (!purchased) {
      return res.status(403).json({ ERROR: "You can review only purchased products" });
    }

    // prevent duplicate review
    const existing = await prisma.review.findFirst({
      where: { userId, productId },
    });

    if (existing) {
      return res.status(400).json({ ERROR: "You already reviewed this product" });
    }

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment,
        productId,
        userId,
      },
    });

    res.status(201).json({
      message: "Review added",
      review,
    });
  } catch (err) {
    console.error("ADD REVIEW ERROR:", err);
    res.status(500).json({ ERROR: "Failed to add review" });
  }
}

// ---------------- EDIT REVIEW ----------------
async function editReview(req, res) {
  try {
    const userId = req.user.id;
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) return res.status(404).json({ ERROR: "Review not found" });

    if (review.userId !== userId) {
      return res.status(403).json({ ERROR: "Not allowed" });
    }

    const updated = await prisma.review.update({
      where: { id: reviewId },
      data: {
        rating: rating ? Number(rating) : review.rating,
        comment: comment ?? review.comment,
      },
    });

    res.json({
      message: "Review updated",
      review: updated,
    });
  } catch (err) {
    console.error("EDIT REVIEW ERROR:", err);
    res.status(500).json({ ERROR: "Failed to update review" });
  }
}

// ---------------- DELETE REVIEW ----------------
async function deleteReview(req, res) {
  try {
    const userId = req.user.id;
    const { reviewId } = req.params;

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) return res.status(404).json({ ERROR: "Review not found" });

    if (review.userId !== userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ ERROR: "Not allowed" });
    }

    await prisma.review.delete({ where: { id: reviewId } });

    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error("DELETE REVIEW ERROR:", err);
    res.status(500).json({ ERROR: "Failed to delete review" });
  }
}

// ---------------- GET PRODUCT REVIEWS ----------------
async function getProductReviews(req, res) {
  try {
    const { productId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: { select: { id: true, name: true, username: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(reviews);
  } catch (err) {
    console.error("GET REVIEWS ERROR:", err);
    res.status(500).json({ ERROR: "Failed to load reviews" });
  }
}

module.exports = {
  addReview,
  editReview,
  deleteReview,
  getProductReviews,
};
