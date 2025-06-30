import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Transaction } from '../types';
import { storage } from '../utils/storage';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (data: Omit<Transaction, '_id' | 'userId'>) => Promise<void>;
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  importTransactions: (file: File) => Promise<void>;
  exportTransactions: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/transactions', {
        withCredentials: true,
      });
      setTransactions(res.data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  };

  const addTransaction = async (data: Omit<Transaction, '_id' | 'userId'>) => {
    try {
      const res = await axios.post('http://localhost:4000/api/transactions', data, {
        withCredentials: true,
      });
      setTransactions((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error('Failed to add transaction:', err);
    }
  };

  const updateTransaction = async (id: string, data: Partial<Transaction>) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/transactions/${id}`, data, {
        withCredentials: true,
      });
      setTransactions((prev) =>
        prev.map((t) => (t._id === id || t.id === id ? res.data : t))
      );
    } catch (err) {
      console.error('Failed to update transaction:', err);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/transactions/${id}`, {
        withCredentials: true,
      });
      setTransactions((prev) => prev.filter((t) => t._id !== id && t.id !== id));
    } catch (err) {
      console.error('Failed to delete transaction:', err);
    }
  };

  const importTransactions = async (file: File) => {
    const imported = await storage.parseCSV(file);

    for (const item of imported) {
      await addTransaction(item);
    }
    await fetchTransactions();
  };

  const exportTransactions = () => {
    storage.exportToCSV(transactions);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        fetchTransactions,
        importTransactions,
        exportTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error('useTransactions must be used within TransactionProvider');
  return context;
};
