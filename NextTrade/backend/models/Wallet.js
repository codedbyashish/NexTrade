const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 10000, // starting demo balance
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);