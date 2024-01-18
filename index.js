import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import mongoose from 'mongoose';

dotenv.config()
const app=express();
app.use(express.json())
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(morgan("common"))
const PORT =  process.env.PORT;
app.use('/auth',authRoutes);
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(PORT,"0.0.0.0",()=>{
        console.log(`Server running on: ${PORT}`);
    })
}).catch((error)=>{
    console.log(`${error} did not connect`)
})
