import User from "../models/User.js";
import UserInterest from "../models/UserInterest.js";
import { interests } from "../utils/interests.js";

// ADD INTEREST

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


// REMOVE INTEREST

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
        interestsToRemove.forEach((interest) => {
            const indexToRemove = userInterests.interests.indexOf(interest);
            if (indexToRemove !== -1) {
            userInterests.interests.splice(indexToRemove, 1);
          }
        });
        console.log("interestremove",interestsToRemove,userInterests)
        await userInterests.save();
        res.status(200).json({ message: "Interests removed successfully" });
    }catch(error)
    {
        console.log("Error", error);
        res.status(500).json({error:"Failed to remove interests"});
    }
}

// GET USER INFO BY USER ID

export const getUserById = async (req, res) => {
    
    try {
        const { userId } = req.params;
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

// GET USER INTEREST

export const getUserInterests = async (req, res) => {
    try {
        const { userId } = req.params;
        const userInterests = await UserInterest.findOne({ userId });

        if (!userInterests) {
            return res.status(404).json({ error: "User has no interests." });
        }

        res.status(200).json({ interests: userInterests.interests });
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Failed to fetch user interests" });
    }
};


// DELETE USER

export const deleteUser=async(req,res)=>{
    try{

    }catch(error)
    {
        console.log("Error",error);
        res.status(500).json({error:"Failed to delete "})
    }
}