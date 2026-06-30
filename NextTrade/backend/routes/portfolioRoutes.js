const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getPortfolio } = require("../controller/portfolioController");

router.get("/", protect, getPortfolio);

module.exports = router;