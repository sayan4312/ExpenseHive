import { Transaction, User } from '../types';

const STORAGE_KEYS = {
  USER: 'expensemate_user',
  TRANSACTIONS: 'expensemate_transactions',
  THEME: 'expensemate_theme',
};

export const storage = {
  // User operations
  getUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Transaction operations
  getTransactions: (): Transaction[] => {
    const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return transactions ? JSON.parse(transactions) : [];
  },

  setTransactions: (transactions: Transaction[]): void => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },

  
  getTheme: (): 'light' | 'dark' => {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    return (theme as 'light' | 'dark') || 'light';
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  // CSV export
  exportToCSV: (transactions: Transaction[]): void => {
    const headers = ['Date', 'Description', 'Category', 'Amount', 'Type'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        t.date,
        `"${t.description}"`,
        t.category,
        t.amount,
        t.type
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // CSV import
  parseCSV: (file: File): Promise<Transaction[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csv = e.target?.result as string;
          const lines = csv.split('\n');
          const headers = lines[0].split(',');
          
          const transactions: Transaction[] = lines.slice(1)
            .filter(line => line.trim())
            .map((line, index) => {
              const values = line.split(',');
              return {
                _id: `imported_${Date.now()}_${index}`,
                id: `imported_${Date.now()}_${index}`,
                date: values[0],
                description: values[1].replace(/"/g, ''),
                category: values[2],
                amount: parseFloat(values[3]),
                type: values[4] as 'income' | 'expense',
                userId: 'current_user'
              };
            });
          
          resolve(transactions);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
};