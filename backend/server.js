import express from "express";
import authRouter from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import { connect } from "./db/connect/db_connect.js";
import { ENV_VARS } from "./config/envVars.js";
const app = express();
app.use(express.json()); //will allow us to parse

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", movieRoutes);

connect(app);
