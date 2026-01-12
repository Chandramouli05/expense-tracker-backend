const mongoose = require("mongoose");

const EmiSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("emiModel", EmiSchema);
