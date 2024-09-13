import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import stationroutes from './routes/stations';
import { connectDB } from './config/db.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/stataions', stationroutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
});