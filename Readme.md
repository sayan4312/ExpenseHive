# ExpenseHive – Modern Expense Tracker

A full-stack expense tracking application built with the MERN stack. Track your income and expenses, analyze financial habits, and visualize your spending through interactive reports with a beautiful, responsive interface.

---

## ✨ Features

### Core Functionality
- ✅ User authentication with JWT + cookie-based sessions
- ✅ Add, edit, and delete income/expenses
- ✅ Filter by categories in reports
- ✅ CSV import/export functionality
- ✅ Summary statistics and category insights
- ✅ Light/Dark theme toggle (auto-persisted)

### User Experience
- 🎨 Glassmorphic UI with gradients and smooth animations
- 📱 Fully responsive on all screen sizes
- 📊 Interactive pie/bar charts for analytics
- 🌙 Persistent dark mode via localStorage
- 💾 Auto-save and real-time updates

---

## 🧑‍💻 Tech Stack

| Layer      | Technology                                |
|------------|--------------------------------------------|
| Frontend   | React + TypeScript + Tailwind CSS          |
| Backend    | Node.js + Express.js                       |
| Database   | MongoDB + Mongoose                         |
| Charts     | Chart.js                                   |
| Auth       | JWT + Cookies (HttpOnly)                   |
| API        | RESTful with Axios                         |
| Storage    | localStorage (for theme & session)         |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/sayan4312/ExpenseHive.git
cd ExpenseHive
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Install frontend dependencies:**
```bash
cd project
npm install
```

4. **Environment Variables:**

Create a `.env` file in the `/backend` directory:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/expense-hive
JWT_SECRET=your_jwt_secret_key_here
```

### 🏃‍♂️ Running the Application

1. **Start the backend server:**
```bash
cd backend
npm start
```

2. **Start the frontend development server:**
```bash
cd project
npm run dev
```

3. **Visit the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

---

## � Project Structure

## 📁 Project Structure

```
ExpenseHive/
├── backend/
│   ├── config/
│   │   └── mongodb.js
│   ├── controller/
│   │   ├── transactioncontroller.js
│   │   └── usercontroller.js
│   ├── middlewares/
│   │   └── authmiddleware.js
│   ├── models/
│   │   ├── transaction.js
│   │   └── users.js
│   ├── routes/
│   │   ├── transactionroutes.js
│   │   └── userroutes.js
│   ├── package.json
│   └── server.js
├── project/
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.png
│   │   ├── components/
│   │   │   ├── Chart.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── SummaryCard.tsx
│   │   │   ├── TransactionForm.tsx
│   │   │   └── TransactionList.tsx
│   │   ├── context/
│   │   │   ├── AuthContext.tsx
│   │   │   └── TransactionContext.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Reports.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── storage.ts
│   │   │   └── validation.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```
## 📡 API Routes

### Authentication
- `POST /api/users/register` — Register new user
- `POST /api/users/login` — User login
- `POST /api/users/logout` — User logout

### Transactions
- `GET /api/transactions` — Get all user transactions
- `POST /api/transactions` — Add a new transaction
- `PUT /api/transactions/:id` — Edit transaction
- `DELETE /api/transactions/:id` — Delete transaction

## 📊 Features & Analytics

### Charts & Visualization
- **Pie Chart**: Expense distribution by category
- **Bar Chart**: Income vs Expenses comparison
- **Interactive Reports**: Filter by date range and categories

### Statistics Summary
- Total transactions count
- Average transaction amount
- Most frequently used category
- Monthly spending trends

### Import/Export Functionality
- ✅ Import transactions from CSV files
- ✅ Export transaction data to CSV format
- ✅ Data backup and migration support

## 🎨 UI/UX Features

- **Modern Design**: Tailwind CSS with glassmorphic effects
- **Theme Support**: Light/Dark mode toggle with persistent storage
- **Responsive Layout**: Mobile-first design approach
- **Smooth Animations**: Enhanced user interactions
- **Custom Logo**: Integrated branding in navigation
- **Accessibility**: WCAG compliant interface elements


## ✅ Development Status

- [x] User authentication system
- [x] CRUD operations for transactions
- [x] JWT + cookie-based security
- [x] Import/export CSV support
- [x] Visual analytics and charts
- [x] Dark/light theme toggle
- [x] Theme persistence
- [x] Mobile responsiveness
- [x] TypeScript integration
- [x] React Context for state management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the project**
2. **Create your feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add some amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Sayan** - [GitHub Profile](https://github.com/sayan4312)

---

⭐ If you found this project helpful, please give it a star on GitHub!