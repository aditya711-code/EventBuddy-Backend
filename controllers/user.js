import User from "../models/User.js";
import UserInterest from "../models/UserInterest.js";
import { interests } from "../utils/interests.js";

export const addInterests=async(req,res)=>{
    try{
        const{userId}=req.params;
        const{interests:newInterests}=req.body;
        if(!Array.isArray(newInterests))
        {
            return res.status(400).json({ error: "Invalid data format"});
        }
        const interestIds = newInterests.map((interest) => interests[interest.toLowerCase()]);   
        const userInterests = await UserInterest.findOne({ userId });
        if (!userInterests) {
          const newUserInterests = new UserInterest({
            userId,
            interests: Array.from(new Set(interestIds)),
          });
          await newUserInterests.save();
        } else {
            const uniqueInterests = Array.from(
              new Set([...userInterests.interests, ...interestIds])
            );
          userInterests.interests = uniqueInterests;
          await userInterests.save();
        }

        res.status(200).json({message:"Interest added successfully"})
    }catch(error)
    {
        console.log("Error",error);
        res.status(500).json({error:"Failed to add interests "})
    }
}

export const removeInterests=async(req,res)=>{
    try{
        const {userId}=req.params;
        const{interests:interestsToRemove}=req.body;
        if(!interestsToRemove)
        {
            res.status(400).json({error:"Invalid data format"});
        }
        const userInterests=await UserInterest.findOne({userId:userId});
        if(!userInterests)
        {
            return res.status(404).json({ error: "User has no interests." });
        }

        const idsToRemove = interestsToRemove.map((interest)=>interests[interest.toLowerCase()])
        userInterests.interests = userInterests.interests.filter((interestId) => !idsToRemove.includes(interestId));

        await userInterests.save();
        res.status(200).json({ message: "Interests removed successfully" });
    }catch(error)
    {
        console.log("Error", error);
        res.status(500).json({error:"Failed to remove interests"});
    }
}

export const deleteUser=async(req,res)=>{
    try{
        
        const{userId}=req.params;
        await User.findByIdAndDelete(userId);
        await UserInterest.deleteOne({userId:userId});
        res.status(200).json({message:"User deleted successfully"})

    }catch(error)
    {
        console.log("Error",error);
        res.status(500).json({error:"Failed to delete "})
    }
}