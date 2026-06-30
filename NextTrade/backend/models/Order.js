const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symbol: String,
    type: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },
    quantity: Number,
    price: Number,
    total: Number,
    //  Only populated on SELL orders — used for Trading page analytics
    pnl: {
      type: Number,
      default: null,
    },
    holdHours: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
