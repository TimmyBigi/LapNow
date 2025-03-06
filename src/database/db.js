import dotenv from "dotenv"; 
dotenv.config(); 
import mongoose from "mongoose"; 
import logger from "../utils/log/logger.js"; 

const connectDB = async (url) => {
 
    try {
      await mongoose.connect(url); 
      logger.info(`Database connected successfully`); 
      return; 
    } catch (error) {
     
      logger.error(`Database connection error: ${error.message}`); 
      process.exit(1); 
    }
  }


export default connectDB;