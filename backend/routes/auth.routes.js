import express from "express";
import { Login, Logout, SignUp } from "../controller/auth.controller.js";
const route = express.Router();

route.post("/signup", SignUp);
route.post("/login", Login);
route.post("/logout", Logout);
export default route;
