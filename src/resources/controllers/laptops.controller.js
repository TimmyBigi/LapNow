import { errorResMsg, successResMsg } from "../../utils/lib/response.js";
import Laptop from "../models/laptop.models.js";
import cloudinary from "../../utils/image/cloudinary.js";
import upload from "../../utils/image/multer.js";



export const addLaptop = async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        try {
            
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "laptops", 
                use_filename: true,
                unique_filename: false,
            });

      
            const { name, brand, processor, ram, storage, price } = req.body;

        
            const newLaptop = new Laptop({
                name,
                brand,
                processor,
                ram,
                storage,
                price,
                imageUrl: result.secure_url,
            });

            await newLaptop.save();

            return successResMsg(res, 201 , {message: "Laptop Added Succesfully", data: newLaptop});
        } catch (error) {
            console.log(error);
            return errorResMsg(res, 500, "Error adding laptop", error.message);
        }
    };



   export  const availableLaptops = async (req, res) => {
        try {
          const laptops = await Laptop.find();
          res.status(200).json(laptops);
        } catch (error) {
          res.status(500).json({ message: "Server error", error: error.message });
        }
      };