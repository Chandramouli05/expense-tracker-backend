const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("incomeModel", IncomeSchema);
