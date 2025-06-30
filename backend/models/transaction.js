import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: String,
  category: String,
  amount: Number,
  type: {
    type: String,
    enum: ['income', 'expense'],
  },
  date: Date,
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
