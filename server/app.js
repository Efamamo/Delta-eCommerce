import express from 'express';
import cors from 'cors';
import { connectToDB } from './database/mongoose.js';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';

const app = express();
app.use(express.json());
app.use(cors());
connectToDB();

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/products', productRouter);

//Handles Not Found Routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen('5001', () => {
  console.log('Listening at port 5001');
});
