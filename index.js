import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
dotenv.config()
const app=express();
app.use(express.json())
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(morgan("common"))
const PORT =  6001;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)

})
app.use('/auth',authRoutes);

