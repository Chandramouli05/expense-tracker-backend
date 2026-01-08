const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
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

module.exports = mongoose.model("categoriesModel", CategoriesSchema);
