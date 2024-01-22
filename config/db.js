import mongoose from "mongoose";
const connectDB=async ()=>{
    try{
         await mongoose.connect(process.env.MONGO_URL);
        console.log("successfully connected to DB")

    }catch(error){
        console.error(`Error connecting to DB: ${error}`);
    }
}
export default connectDB;