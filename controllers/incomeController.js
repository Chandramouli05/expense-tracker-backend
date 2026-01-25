const Income = require("../models/incomeModel");

exports.getAll = async (req, res) => {
  try {
    const getIncome = await Income.find({ userId: req.userId });
    res.json(getIncome);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, type, amount, date } = req.body;
    const createIncome = new Income({
      title,
      type,
      amount,
      date,
      userId: req.userId,
    });
    const saved = await createIncome.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Not Found" });
    }

    return res.status(200).json(updatedIncome);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.delete = async(req,res) => {
    try{
        const deletedIncome = await Income.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });
        if(!deletedIncome) return res.status(404).json({error:"Not Found"})
        res.json({message:'Deleted'})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}