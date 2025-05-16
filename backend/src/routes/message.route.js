import express from "express";
import { authenticateUser } from "../middleware/authenticate.js";
import {
  getMessages,
  getUserForSideBar,
  sendMessage,
} from "../controllers/message.route.js";
const router = express.Router();
import { upload } from "../helper/multer.js";

router.get("/user", authenticateUser, getUserForSideBar);
router.get("/:id", authenticateUser, getMessages);
router.post("/send/:id", authenticateUser, upload.single("image"), sendMessage);
export default router;
