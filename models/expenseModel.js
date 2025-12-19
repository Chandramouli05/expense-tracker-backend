const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    cateogory: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    notes: { type: String  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("expenseModel", ExpenseSchema);
