const express = require("express");
const { protect } = require("../middlewares/protect");
const { authorizeRoles } = require("../middlewares/roles");
const upload = require("../middlewares/upload");

const {
  createCategory,
  getCategories,
  getCategoryWithProducts,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = express.Router();

// Public
router.get("/", getCategories);
router.get("/:id", getCategoryWithProducts);

// Admin
router.post(
  "/",
  protect,
  authorizeRoles("ADMIN"),
  upload.single("image"),
  createCategory
);

router.put(
  "/:id",
  protect,
  authorizeRoles("ADMIN"),
  upload.single("image"),
  updateCategory
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("ADMIN"),
  deleteCategory
);

module.exports = router;
