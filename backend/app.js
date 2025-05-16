import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { conn } from "./src/connection/conn.js";
import { app, server } from "./src/lib/socket.js";
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server is started on port ${process.env.PORT}`);
  conn();
});
