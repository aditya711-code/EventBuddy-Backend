import bcrypt from "bcrypt";
import User from '../models/User.js'
/*Register User*/
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log("req",firstName,lastName)
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
