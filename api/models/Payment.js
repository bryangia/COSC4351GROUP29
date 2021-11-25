const mongoose = require("mongoose");

// Create info schema
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    stripeId: { type: String, required: true },
    date: { type: Date, required: true },
    table: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model("Payment", OrderSchema);
