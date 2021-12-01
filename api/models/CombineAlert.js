const mongoose = require("mongoose");

// Create info schema
const CombineSchema = new mongoose.Schema(
  {
    userId: { type: String },
    date: { type: Date, required: true },
    table1: { type: String, required: true },
    table2: { type: String, required: true },
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model("Combine", CombineSchema);
