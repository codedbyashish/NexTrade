// backend/models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
    },
    type: {
      type: String,
      enum: ["BUY", "SELL"], // Restricts data to only these two actions
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity cannot be less than 1"],
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { 
    timestamps: true //  Automatically adds 'createdAt' and 'updatedAt' fields!
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);