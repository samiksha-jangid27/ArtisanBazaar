const express = require("express");
const { protect } = require("../middlewares/protect");
const { authorizeRoles } = require("../middlewares/roles");
const { becomeSeller } = require("../controllers/seller.controller");

const router = express.Router();

// Make the logged-in user a seller
router.post("/become", protect, becomeSeller);

module.exports = router;
