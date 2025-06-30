import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import connectdb from './config/mongodb.js';
import userroutes from './routes/userroutes.js';
import transactionRoutes from './routes/transactionroutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectdb();


app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use('/api/users', userroutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
