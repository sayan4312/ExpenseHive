import React, { useState } from 'react';
import { Edit2, Trash2, Calendar, Tag, DollarSign } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { formatCurrency, formatDate } from '../utils/validation';
import { CATEGORIES } from '../types';
import { Transaction } from '../types';

const TransactionList: React.FC = () => {
  const { transactions, updateTransaction, deleteTransaction } = useTransactions();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    description: '',
    category: '',
    amount: '',
  });

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction._id);
    setEditForm({
      description: transaction.description,
      category: transaction.category,
      amount: transaction.amount.toString(),
    });
  };

  const handleSaveEdit = (id: string) => {
    updateTransaction(id, {
      description: editForm.description,
      category: editForm.category,
      amount: parseFloat(editForm.amount),
    });
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
        <DollarSign className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No transactions yet</h3>
        <p className="text-gray-600 dark:text-gray-400">Start by adding your first transaction above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="p-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          >
            {editingId === transaction._id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                    placeholder="Description"
                  />
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                    className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                    placeholder="Amount"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveEdit(transaction._id)}
                    className="px-3 py-1 text-sm text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors duration-200"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        transaction.type === 'income'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      }`}
                    >
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {transaction.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(transaction.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                          <Tag className="h-3 w-3" />
                          <span>{transaction.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    className={`text-lg font-semibold ${
                      transaction.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="p-2 text-gray-400 hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
