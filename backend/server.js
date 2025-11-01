import express from "express";
import authRouter from "./routes/auth.routes.js";
import { connect } from "./db/connect/db_connect.js";
const app = express();
app.use(express.json()); //will allow us to parse

app.use("/api/v1/auth", authRouter);

connect(app);
