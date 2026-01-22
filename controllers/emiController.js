const EMI = require("../models/emiModel");

exports.getAll = async (req, res) => {
  try {
    const getEMI = await EMI.find({ userId: req.userId });
    res.json(getEMI);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, amount, date } = req.body;
    const createEMI = new EMI({ name, amount, date, userId: req.userId });
    const saved = await createEMI.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedEMI = await EMI.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedEMI) {
      return res.status(404).json({ error: "Not Found" });
    }
    return res.status(200).json(updatedEMI);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleteEMI = await EMI.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!deleteEMI) return res.status(404).json({ error: "Not Found" });
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
