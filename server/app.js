import express from 'express';
import cors from 'cors';
import welcomeRouter from './routes/welcome.js';
import { connectToDB } from './database/mongoose.js';
const app = express();
app.use(cors());
connectToDB();
app.use('', welcomeRouter);

app.listen('5001', () => {
  console.log('Listening at port 5001');
});
