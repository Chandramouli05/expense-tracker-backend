const Expense = require("../models/expenseModel");

exports.getAll = async (req, res ) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, amount, cateogory, date, notes } = req.body;
    const createExpense = new Expense({ title, amount, cateogory, date, notes });
    const saved = await createExpense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updateExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateExpense) return res.status(404).json({ error: "Not Found" });
    res.json(updateExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleteExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deleteExpense) return res.status(404).json({ error: "Not Found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
