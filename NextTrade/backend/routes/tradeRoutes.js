const express = require("express");
const router = express.Router();

const {
  buyStock,
  sellStock,
  getTradingActivity,
  closePosition,
} = require("../controller/tradeController");
const protect = require("../middleware/authMiddleware");

router.post("/buy", protect, buyStock);
router.post("/sell", protect, sellStock);

// Trading page data + close-position action
router.get("/activity", protect, getTradingActivity);
router.post("/positions/:symbol/close", protect, closePosition);

module.exports = router;
