import { passwordCompare, passwordHash } from "../../middleware/hashing.js";
import { errorResMsg, successResMsg } from "../../utils/lib/response.js";
import jwt from "jsonwebtoken"
import logger from "../../utils/log/logger.js";
import Admin from "../models/admin.js";
import User from "../models/user.js";



export const adminSignUp = async (req, res)=> {
    const { firstName, lastName, email, password, phoneNumber} = req.body;
    try {
        if (!firstName || !lastName || !email || !password || !phoneNumber){
            return res.status(400).json({ message: "Please Fill All Required Fields" });
        }
    
        const admin = await Admin.findOne({ email });
        if (admin) {
            return errorResMsg(res, 400, "Email Already Exists");
        }
       
        const hashedPassword = await passwordHash(password);

        const newAdmin = await Admin.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
        });
        return successResMsg(res, 201, {
            message: "Admin Created Successfully",
            user: newAdmin,
        });
    } catch (err) {
        console.error(err);
        return errorResMsg(res, 500, "Server Error");
    }
}


export const adminLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return errorResMsg(res, 400, "Please Fill All Fields");
        }
     
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return errorResMsg(res, 400, "Admin Not Found");
        }
        const isMatch = await passwordCompare(password, admin.password);
        if (!isMatch) {
            return errorResMsg(res, 400, "Incorrect password");
        }
   
        const payload = {
            id: admin._id,
            email: admin.email,
            role: admin.role
        }
   
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5d" });
        return successResMsg(res, 200, {
            message: "Logged In Successfully",
            token
        });
    } catch (error) {
        console.log(error);
        
        logger.error(error);
        return errorResMsg(res, 500, "Server Error");
    }
}


export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 }); 
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

 
  export const searchUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;

      const user = await User.findOne({ email }, { password: 0 });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};
