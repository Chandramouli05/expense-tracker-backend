const Categories = require("../models/categoriesModel");

exports.getAll = async (req, res) => {
  try {
    const category = await Categories.find({userId :req.userId});
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const createCategory = new Categories({ name, icon, userId: req.userId });
    const saved = await createCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedCategories = await Categories.findOneAndUpdate(
      {_id: req.params.id, userId: req.userId},
      req.body,
      { new: true }
    );

    if (!updatedCategories) return res.status(404).json({ error: "Not Found" });
    res.json(updatedCategories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleteCategories = await Categories.findOneAndDelete({ _id: req.params.id, userId: req.userId});
    if (!deleteCategories) return res.status(404).json({ error: "Not Found" });
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
