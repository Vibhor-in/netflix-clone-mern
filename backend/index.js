import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

// Load environment variables
dotenv.config({
  path: ".env",
});

// Connect to MongoDB
databaseConnection();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://netflix-clone-mern-6u9y.vercel.app",
    "https://netflix-clone-mern-6u9y-1f07r3rap.vercel.app",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);

// Start Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
