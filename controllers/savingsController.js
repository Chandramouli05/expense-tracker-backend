const Savings = require("../models/savingsModel");

exports.getAll = async (req, res) => {
  try {
    const savings = await Savings.find({ userId: req.userId });
    res.json(savings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, type, amount, date } = req.body;
    const createSavings = new Savings({
      title,
      type,
      amount,
      date,
      userId: req.userId,
    });
    const saved = await createSavings.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedSavings = await Savings.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedSavings) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(updatedSavings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedSavings = await Savings.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!deletedSavings) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
