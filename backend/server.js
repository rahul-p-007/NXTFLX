import express from "express";
import authRouter from "./routes/auth.routes.js";
const app = express();

app.use("/api/v1/auth", authRouter);

app.listen(5000, () => {
  console.log(`server started `);
});
