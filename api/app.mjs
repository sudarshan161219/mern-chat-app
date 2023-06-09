import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { chats } from "./data/data.js";
const app = express();

const port = process.env.PORT || 4000;


const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("<h1>HOME</h1>");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const param = req.params.id;
  const singleChat = chats.find((c) => c._id === param);
  res.send(singleChat);
});

const start = () => {
  try {
    app.listen(port, console.log(`server: http://localhost:${port}/`));
  } catch (error) {
    console.log(error);
  }
};

start();
