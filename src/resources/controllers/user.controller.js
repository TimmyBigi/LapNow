import { errorResMsg, successResMsg } from "../../utils/lib/response.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const signup = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  try {
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Please Fill All Required Fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return errorResMsg(res, 400, "Email Already Exists");
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    return successResMsg(res, 201, {
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    return errorResMsg(res, 500, "Server Error");
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return errorResMsg(res, 400, "Fill All Fields");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResMsg(res, 404, "User Not Found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResMsg(res, 401, "Invalid Password");
    }
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "4d",
    });
    return successResMsg(res, 200, {
      message: "Logged In Successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, "Server Error");
  }
};
