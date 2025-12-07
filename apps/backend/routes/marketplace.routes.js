const express = require("express");
const { getMarketplaceHome } = require("../controllers/marketplace.controller");

const router = express.Router();

// Public
router.get("/home", getMarketplaceHome);

module.exports = router;
