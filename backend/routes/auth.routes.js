import express from "express";
import { Login, Logout, SignUp } from "../controller/auth.controller.js";
const route = express.Router();

route.get("/login", Login);
route.get("/signup", SignUp);
route.get("/logout", Logout);
export default route;
