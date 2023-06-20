import asyncHandler from "express-async-handler";
import { Chat } from "../Models/ChatModel.js";
import { User } from "../Models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { json } from "express";

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
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
      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400).send(error);
    }
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name, pic, email",
        });
        res.status(StatusCodes.OK).send(results);
      });
  } catch (error) {
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  const { users, name } = req.body;

  if (!users || !name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "Please Provide all values!" });
  }

  var groupUsers = JSON.parse(users);

  if (groupUsers.length < 2) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("More than 2 users are required to form a group chat");
  }

  groupUsers.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: groupUsers,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(StatusCodes.OK).json(fullGroupChat);
  } catch (error) {
    throw new Error(error.message);
  }
});

const renameGroupChat = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("chat not found");
  } else {
    res.json(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("chat not found");
  } else {
    res.json(added);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
   const { chatId, userId } = req.body;

   const removed = await Chat.findByIdAndUpdate(
     chatId,
     {
       $pull: { users: userId },
     },
     { new: true }
   )
     .populate("users", "-password")
     .populate("groupAdmin", "-password");

   if (!removed) {
     res.status(StatusCodes.BAD_REQUEST);
     throw new Error("chat not found");
   } else {
     res.json(removed);
   }
});

export {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  removeFromGroup,
  addToGroup,
};
