import express from 'express';
import cors from 'cors';
import welcomeRouter from './routes/welcome.js';
import { connectToDB } from './database/mongoose.js';
const app = express();
app.use(cors());
connectToDB();

app.use('/api/v1', welcomeRouter);

//Handles Not Found Routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen('5001', () => {
  console.log('Listening at port 5001');
});
