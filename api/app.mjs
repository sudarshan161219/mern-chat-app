import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { chats } from "./data/data.js";
import connectDb from "./DB/connectDb.mjs";
import userRoute from "./routes/userRoute.mjs";
const app = express();

const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("<h1>HOME</h1>");
});

app.use("/api/user", userRoute);

const start = async () => {
  try {
    await connectDb(uri);
    console.log("connected to Db....");
    app.listen(port, console.log(`server: http://localhost:${port}/`));
  } catch (error) {
    console.log(error);
  }
};

start();
