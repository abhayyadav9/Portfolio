import express from "express";
import cors from "cors";
import dbConnection from "./dataBase/db.js";
import dotenv from "dotenv";
import adminRoute from "./routes/adminRoute.js";
import projectRoute from "./routes/projectRoute.js";
import contactRoute from "./routes/contactRoute.js";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();  // Load environment variables

const app = express(); 
const __dirname = path.resolve();  // Setting __dirname for ES modules
const port = process.env.PORT || 8000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

// Database Connection
dbConnection();

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "client", "dist")));

// API Routes
app.use("/api/v1/admin", adminRoute);
app.use("/api/v2/project", projectRoute);
app.use("/api/v3/contact", contactRoute);

// Root route - API check
app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

// Catch-all route for client-side routing - serves React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
