import express from 'express';
import { addLaptop, availableLaptops} from "../controllers/laptops.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import upload from "../../utils/image/multer.js";
const router = express.Router();

router.post("/laptops", upload.single('image'), isAuthenticated, addLaptop);
 router.get("/ava/laptop", isAuthenticated, availableLaptops);

  

export default router; 