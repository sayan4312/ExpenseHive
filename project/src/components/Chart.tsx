import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/validation';

interface ChartProps {
  transactions: Transaction[];
  type: 'pie' | 'bar';
}

const COLORS = [
  '#3b82f6', '#14b8a6', '#8b5cf6', '#f59e0b', '#ef4444',
  '#10b981', '#f97316', '#6366f1', '#ec4899', '#84cc16'
];

const Chart: React.FC<ChartProps> = ({ transactions, type }) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  const categoryData = expenseTransactions.reduce((acc, transaction) => {
    const existing = acc.find(item => item.category === transaction.category);
    if (existing) {
      existing.amount += transaction.amount;
    } else {
      acc.push({
        category: transaction.category,
        amount: transaction.amount,
      });
    }
    return acc;
  }, [] as { category: string; amount: number }[]);

  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const existing = acc.find(item => item.month === month);
    
    if (existing) {
      if (transaction.type === 'income') {
        existing.income += transaction.amount;
      } else {
        existing.expenses += transaction.amount;
      }
    } else {
      acc.push({
        month,
        income: transaction.type === 'income' ? transaction.amount : 0,
        expenses: transaction.type === 'expense' ? transaction.amount : 0,
      });
    }
    return acc;
  }, [] as { month: string; income: number; expenses: number }[]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === 'pie') {
    if (categoryData.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No expense data to display
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ category, percent }) => 
              percent > 0.05 ? `${category} ${(percent * 100).toFixed(0)}%` : ''
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (monthlyData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="month" 
          className="text-xs"
          tick={{ fill: 'currentColor' }}
        />
        <YAxis 
          className="text-xs"
          tick={{ fill: 'currentColor' }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="income" fill="#10b981" name="Income" radius={[2, 2, 0, 0]} />
        <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;