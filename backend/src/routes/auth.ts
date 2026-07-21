import { Router } from "express";
import {
  signup,
  login,
  logout,
  getCurrentUser
} from "../controllers/authController.js";

const router = Router();

// Create account
router.post("/signup", signup);

// Login user
router.post("/login", login);

// Logout user
router.post("/logout", logout);

// Get current logged-in user
router.get("/me", getCurrentUser);

export default router;
