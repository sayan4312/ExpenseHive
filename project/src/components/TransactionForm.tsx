import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { CATEGORIES } from '../types';
import { validateAmount } from '../utils/validation';

interface TransactionFormProps {
  isModal?: boolean;
  onClose?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isModal = false, onClose }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTransaction } = useTransactions();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.amount || !validateAmount(formData.amount)) {
      newErrors.amount = 'Valid amount is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      addTransaction({
        date: formData.date,
        description: formData.description.trim(),
        category: formData.category,
        amount: parseFloat(formData.amount),
        type: formData.type,
      });

      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
        amount: '',
        type: 'expense',
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-colors duration-200";
  
  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={inputClasses}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Type
          </label>
          <div className="mt-1 flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                formData.type === 'expense'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                formData.type === 'income'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Income
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={inputClasses}
          placeholder="Enter transaction description"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className={inputClasses}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className={inputClasses}
            placeholder="0.00"
          />
          {errors.amount && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
          <span>{isSubmitting ? 'Adding...' : 'Add Transaction'}</span>
        </button>
      </div>
    </form>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add Transaction</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            {formContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Add New Transaction</h2>
      {formContent}
    </div>
  );
};

export default TransactionForm;