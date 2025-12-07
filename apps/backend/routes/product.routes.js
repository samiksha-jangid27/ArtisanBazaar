const express = require("express");
const { protect } = require("../middlewares/protect");
const { authorizeRoles } = require("../middlewares/roles");
const upload = require("../middlewares/upload");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  getFeaturedProducts,
  getTrendingProducts,
  getSellerProducts,
} = require("../controllers/product.controller");

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllProducts); // main marketplace API
router.get("/featured", getFeaturedProducts);
router.get("/trending", getTrendingProducts);
router.get("/seller/:sellerId", getSellerProducts);
router.get("/:productId", getSingleProduct);

// SELLER ROUTES
router.post(
  "/",
  protect,
  authorizeRoles("SELLER"),
  upload.array("images", 5),
  createProduct
);

router.put(
  "/:productId",
  protect,
  authorizeRoles("SELLER"),
  upload.array("images", 5),
  updateProduct
);

// DELETE — SELLER or ADMIN
router.delete(
  "/:productId",
  protect,
  authorizeRoles("SELLER", "ADMIN"),
  deleteProduct
);

module.exports = router;
