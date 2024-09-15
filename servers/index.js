import express from "express";
import cors from "cors";
import dbConnection from "./dataBase/db.js";
import dotenv from "dotenv";
import adminRoute from "./routes/adminRoute.js";
import projectRoute from "./routes/projectRoute.js";

import cookieParser from "cookie-parser";


const app = express(); // Missing app initialization
app.use(cookieParser());  // Add cookie-parser middleware here

const corsConfig = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
dotenv.config()

app.get("/", (req, res) => {
  res.json({ "hello": "hjhj" });
});

app.use("/api/v1/admin",adminRoute);
app.use("/api/v2/project",projectRoute);


const port = 8000;
app.listen(port, () => {
  dbConnection();
  console.log(`The app is listening on port ${port}`);
});
