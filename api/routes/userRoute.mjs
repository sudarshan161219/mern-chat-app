import express from "express";
import { register, login, allUsers } from "../controllers/authController.mjs";
import auth from "../middleWare/auth.mjs"

const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(auth, allUsers);

export default router;