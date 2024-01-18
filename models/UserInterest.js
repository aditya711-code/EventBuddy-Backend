import mongoose from "mongoose";

const UserInterestSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
        interests:{
            type:[Number],
            default:[]
        }
    },
    {
        timestamps:true,

    }
)
const UserInterest=mongoose.model("UserInterest",UserInterestSchema);
export default UserInterest;
