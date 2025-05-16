import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authenticateUser } from "../middleware/authenticate.js";
import { upload } from "../helper/multer.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put(
  "/update-profile",
  authenticateUser,
  upload.single("profilePic"),
  updateProfile
);

router.get("/check", authenticateUser, checkAuth);

export default router;
