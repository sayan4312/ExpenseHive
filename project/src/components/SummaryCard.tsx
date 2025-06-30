import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/validation';

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'balance';
  trend?: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type, trend }) => {
  const getIcon = () => {
    switch (type) {
      case 'income':
        return TrendingUp;
      case 'expense':
        return TrendingDown;
      case 'balance':
        return DollarSign;
      default:
        return DollarSign;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'income':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'expense':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      case 'balance':
        return amount >= 0 
          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
          : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const Icon = getIcon();
  const colorClasses = getColorClasses();

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className={`text-2xl font-bold mt-1 ${type === 'balance' && amount < 0 ? 'text-red-600 dark:text-red-400' : type === 'income' ? 'text-green-600 dark:text-green-400' : type === 'expense' ? 'text-red-600 dark:text-red-400' : 'text-primary-600 dark:text-primary-400'}`}>
            {formatCurrency(Math.abs(amount))}
          </p>
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              <TrendingUp className={`h-4 w-4 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm ml-1 ${trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {trend >= 0 ? '+' : ''}{trend.toFixed(1)}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;