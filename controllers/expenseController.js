const Expense = require("../models/expenseModel");

exports.getAll = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.create = async (req, res) => {
  try {
    const { title, amount,  date,  status } = req.body;

    if(!categoryId){
      return res.status(400).json({error:"categoryId is required"})
    }
    const createExpense = new Expense({
      title,
      amount,
      date,
      status,
      userId: req.userId,
    });
    const saved = await createExpense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updateExpense = await Expense.findByIdAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updateExpense) return res.status(404).json({ error: "Not Found" });
    res.json(updateExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleteExpense = await Expense.findByIdAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!deleteExpense) return res.status(404).json({ error: "Not Found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
