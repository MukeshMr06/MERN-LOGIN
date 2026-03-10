import express from 'express';
import { conntTODatabase } from '../backend/database/connectionTOdatabase.js';
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv'
dotenv.config();

const app = express ();
app.use(express.json())

app.use('/api/auth', authRoutes)

conntTODatabase();


app.listen(3000, ()=>{
   console.log(`Server is connected on 3000`)
})