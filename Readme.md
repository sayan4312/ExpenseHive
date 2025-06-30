# ExpenseHive –  MERN Expense Tracker

A modern, animated and user-friendly expense tracker built with the MERN stack. Track your income and expenses, analyze financial habits, and visualize your spending through interactive reports — all in a dark-themed, beautifully designed web app.

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


git clone https://github.com/yourusername/expense-hive.git
cd expense-hive

Install dependencies:

Copy
Edit
cd backend
npm install
cd ../frontend
npm install


Environment Variables :

Create a .env file in /backend:


Copy
Edit
PORT=4000
MONGODB_URI=mongodb://localhost:27017/expense-hive
JWT_SECRET=your_jwt_secret


▶️ Running the App:

Backend :-

bash
Copy
Edit
cd backend
node server

Frontend :-
bash
Copy
Edit
cd frontend
npm run dev

Visit the app at: http://localhost:5173

🗂 Project Structure
pgsql
Copy
Edit

expense-hive/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── models/
│   └── server.js
├── frontend/
│   ├── context/
│   ├── components/
│   ├── pages/
│   ├── types/
│   ├── utils/
│   └── App.tsx
└── README.md
📡 API Routes:-

POST /api/users/register — Register new user

POST /api/users/login — Login

GET /api/users/logout — Logout

Transactions:-

GET /api/transactions — Get all user transactions

POST /api/transactions — Add a new transaction

PUT /api/transactions/:id — Edit transaction

DELETE /api/transactions/:id — Delete transaction

📊 Reports & Charts:-

Pie Chart: Expense distribution by category

Bar Chart: Income vs Expenses

Stats Summary:

Total transactions

Average amount

Most used category

📦 Import/Export
✅ Import .csv transaction files

✅ Export your data to CSV for backups or spreadsheets

🎨 UI Highlights
Tailwind-powered dark/light theme

Framer Motion animations

Gradient buttons and hover effects

Curved logo integrated in navbar


✅ TODO Checklist:-

 User auth

 CRUD for transactions

 JWT + cookie security

 Import/export support

 Visual analytics

 Dark/light mode toggle

 Theme persistence

 Mobile responsiveness

🤝 Contributing:-

Fork the project

Create your feature branch: git checkout -b feat/feature-name

Commit your changes: git commit -m "Add something cool"

Push to the branch: git push origin feat/feature-name

Open a Pull Request