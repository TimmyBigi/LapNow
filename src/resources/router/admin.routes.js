import express from 'express';
import { adminLogin, adminSignUp, getAllUsers, searchUserByEmail } from '../controllers/admin.controller.js';
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
const router = express.Router();


router.post('/admin-signup', adminSignUp);
router.post('/admin-login', adminLogin);
router.get("/admin/users", isAuthenticated, getAllUsers);
router.get("/users/search/:email", isAuthenticated, searchUserByEmail);

export default router;