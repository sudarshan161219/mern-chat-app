import express from "express";
import auth from "../middleWare/auth.mjs";
import {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  removeFromGroup,
  addToGroup,
} from "../controllers/chatController.mjs"

const router = express.Router();

router.route("/").post(auth, accessChat);
router.route("/").get(auth, fetchChat);
router.route("/group").post(auth, createGroupChat);
router.route("/rename").put(auth, renameGroupChat);
router.route("/groupremove").put(auth, removeFromGroup);
router.route("/groupradd").put(auth, addToGroup);

export default router;
