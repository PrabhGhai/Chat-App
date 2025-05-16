import User from "../models/user.model.js";
import Message from "../models/messages.model.js";
import cloudinary from "../helper/cloudinary.js";
import { Readable } from "stream";
import { getReceiverSocketId, io } from "../lib/socket.js";
export const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getUserForSideBar controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let uploadRes = null;
    if (req.file) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "profiles" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          Readable.from(req.file.buffer).pipe(stream);
        });
      uploadRes = await streamUpload();
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: uploadRes?.secure_url,
    });

    await newMessage.save();

    //sockets
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); //its private chat so thats why using to otherwise we can use emit to brodcast
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessages controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
