import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import SummaryCard from '../components/SummaryCard';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

interface DashboardProps {
  showModalOnLoad?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ showModalOnLoad = false }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { transactions } = useTransactions();
  const location = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (showModalOnLoad || location.pathname === "/add-transaction") {
      setShowAddModal(true);
    }
  }, [showModalOnLoad, location.pathname]);

  
  const handleCloseModal = () => {
    setShowAddModal(false);
    if (location.pathname === "/add-transaction") {
      navigate("/dashboard");
    }
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/30 via-white to-secondary-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Track your finances and manage expenses</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 sm:mt-0 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Transaction</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Total Income"
            amount={totalIncome}
            type="income"
            trend={12.5}
          />
          <SummaryCard
            title="Total Expenses"
            amount={totalExpenses}
            type="expense"
            trend={-5.2}
          />
          <SummaryCard
            title="Net Balance"
            amount={netBalance}
            type="balance"
            trend={8.1}
          />
        </div>

        {/* Transaction List */}
        <div className="space-y-8">
          <TransactionList />
        </div>

        {/* Add Transaction Modal */}
        {showAddModal && (
          <TransactionForm
            isModal
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
