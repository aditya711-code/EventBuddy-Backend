import bcrypt from "bcrypt";
import User from '../models/User.js'
import jwt from "jsonwebtoken";

/*Register User*/
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

/*Login user*/
export const login=async(req,res)=>{
  try{
      const{email,password}=req.body;
      const user=await User.findOne({email:email});
      if(!user){
        return res.status(400).json({message:"User does not exist"});
      }
      const isMatch=await bcrypt.compare(password,user.password)
      if(!isMatch)
        return res.status(400).json({message:"Invalid credentials"});

      const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
      const userObject = user.toObject();
      delete userObject.password;
      res.status(200).json({token,userObject});
  }catch(error){
      res.status(500).json(error);
  }
}