import asyncHandler from "express-async-handler";
import { Chat } from "../Models/ChatModel.js";
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("userId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elementMatch: { $eq: req.user._id } } },
      { users: { $elementMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name, pic, email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat)
    } catch (error) {res.status(400).send(error);}
  }
});

const fetchChat = asyncHandler(async (req, res) => {});

const createGroupChat = asyncHandler(async (req, res) => {});

const renameGroupChat = asyncHandler(async (req, res) => {});

const removeFromGroup = asyncHandler(async (req, res) => {});

const addToGroup = asyncHandler(async (req, res) => {});

export {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  removeFromGroup,
  addToGroup,
};
