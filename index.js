import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import eventRoutes from './routes/event.js';
import cors from 'cors'
import connectDB from './config/db.js';
dotenv.config()
const app=express();
app.use(express.json())
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(cors());
app.use(morgan("common"))
const PORT =  process.env.PORT;

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/events',eventRoutes);

connectDB().then(()=>{
    app.listen(PORT,"0.0.0.0",()=>{
        console.log(`Server running on: ${PORT}`);
    })
}).catch((error)=>{
    console.log(`${error} did not connect`)
})
