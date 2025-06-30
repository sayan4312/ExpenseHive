import Transaction from '../models/transaction.js';

export const addTransaction = async (req, res) => {
  try {
    const { description, category, amount, type, date } = req.body;
    const transaction = await Transaction.create({
      userId: req.user.id,
      description,
      category,
      amount,
      type,
      date,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Error creating transaction', error: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting transaction' });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating transaction' });
  }
};
