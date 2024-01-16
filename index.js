const express=require('express')
const bodyParser=require('body-parser')
const dotenv=require('dotenv')
const app=express()
app.use(express.json())
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.post("/auth/register", register);
const PORT =  6001;

