const express = require("express");
const { protect } = require("../middlewares/protect");
const { authorizeRoles } = require("../middlewares/roles");
const upload = require("../middlewares/upload");

const {
  getMyStore,
  updateStore,
  getSellerStore,
} = require("../controllers/store.controller");

const router = express.Router();

// SELLER: Get your profile
router.get("/me", protect, authorizeRoles("SELLER"), getMyStore);

// SELLER: Update store profile
router.put(
  "/me",
  protect,
  authorizeRoles("SELLER"),
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateStore
);

// PUBLIC: seller storefront
router.get("/:sellerId", getSellerStore);

module.exports = router;
