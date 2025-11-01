import mongoose from "mongoose";
import { ENV_VARS } from "../../config/envVars.js";

const port = ENV_VARS.PORT;
const MONOGO_DB_CONNECTION_STRING = ENV_VARS.MONGO_URI;
export const connect = async (app) => {
  try {
    await mongoose.connect(MONOGO_DB_CONNECTION_STRING, {
      dbName: "NXTFLX",
    });
    app.listen(port, () => {
      console.log(`Server is connected on the ${port}`);
    });
    console.log(`Connected to Database successfully🚀🚀🚀`);
  } catch (error) {
    console.log("Database error");
    console.log(error.message);
    process.exit(1);
  }
};
