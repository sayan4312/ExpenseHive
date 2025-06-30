import express from "express";
import { register, login } from "../controller/usercontroller.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
import { logout } from '../controller/usercontroller.js';
router.get('/logout', logout);


export default router;
