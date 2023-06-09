import mongoose from "mongoose";
const { Schema, model } = mongoose;

const messageModel = Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageModel)

export { Message };
