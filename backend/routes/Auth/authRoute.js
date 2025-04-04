import express from 'express';
import { registerUser, loginUser, verifyOTP, logoutUser } from '../../controller/Auth/authControllers.js';

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/verify-otp", verifyOTP);
    


export default authRouter;