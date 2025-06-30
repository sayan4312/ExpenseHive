import React, { useState } from 'react';
import { Download, Upload, Filter } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import Chart from '../components/Chart';
import { CATEGORIES } from '../types';

const Reports: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');
  const [fileInputKey, setFileInputKey] = useState(0);
  const { transactions, importTransactions, exportTransactions } = useTransactions();

  const filteredTransactions = selectedCategory
    ? transactions.filter(t => t.category === selectedCategory)
    : transactions;

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importTransactions(file);
      alert('Transactions imported successfully!');
      setFileInputKey(prev => prev + 1); // Reset file input
    } catch (error) {
      alert('Failed to import transactions. Please check the file format.');
    }
  };

  const handleExport = () => {
    if (transactions.length === 0) {
      alert('No transactions to export');
      return;
    }
    exportTransactions();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/30 via-white to-secondary-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Visualize your spending patterns and trends</p>
          </div>
          
          {/* Import/Export Buttons */}
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <label className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 cursor-pointer">
              <Upload className="h-4 w-4" />
              <span>Import CSV</span>
              <input
                key={fileInputKey}
                type="file"
                accept=".csv"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setChartType('pie')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  chartType === 'pie'
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Pie Chart
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  chartType === 'bar'
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Bar Chart
              </button>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expense Distribution */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {chartType === 'pie' ? 'Expense Distribution by Category' : 'Income vs Expenses Over Time'}
            </h3>
            <Chart transactions={filteredTransactions} type={chartType} />
          </div>

          {/* Summary Stats */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Summary Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-green-700 dark:text-green-400 font-medium">Total Transactions</span>
                <span className="text-green-900 dark:text-green-300 font-bold">{filteredTransactions.length}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-blue-700 dark:text-blue-400 font-medium">Average Transaction</span>
                <span className="text-blue-900 dark:text-blue-300 font-bold">
                  ${filteredTransactions.length > 0 
                    ? (filteredTransactions.reduce((sum, t) => sum + t.amount, 0) / filteredTransactions.length).toFixed(2)
                    : '0.00'
                  }
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <span className="text-purple-700 dark:text-purple-400 font-medium">Most Used Category</span>
                <span className="text-purple-900 dark:text-purple-300 font-bold">
                  {(() => {
                    const categoryCount = filteredTransactions.reduce((acc, t) => {
                      acc[t.category] = (acc[t.category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>);
                    const mostUsed = Object.entries(categoryCount).sort(([,a], [,b]) => b - a)[0];
                    return mostUsed ? mostUsed[0] : 'None';
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;