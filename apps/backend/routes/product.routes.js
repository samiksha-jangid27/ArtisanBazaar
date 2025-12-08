const express = require("express");
const { protect } = require("../middlewares/protect");
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
router.get("/", getAllProducts); // marketplace
router.get("/featured", getFeaturedProducts);
router.get("/trending", getTrendingProducts);
router.get("/seller/:sellerId", getSellerProducts);
router.get("/:productId", getSingleProduct);

// ANY LOGGED-IN USER CAN CREATE / UPDATE / DELETE OWN PRODUCTS

router.post(
  "/",
  protect,
  upload.array("images", 5),
  createProduct
);

router.put(
  "/:productId",
  protect,
  upload.array("images", 5),
  updateProduct
);

router.delete(
  "/:productId",
  protect,
  deleteProduct
);

module.exports = router;
