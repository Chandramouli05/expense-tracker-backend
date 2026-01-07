const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({

  name: { type: String, required: true },
  icon: { type: String, required: true },
});

module.exports = mongoose.model("categoriesModel", CategoriesSchema);
