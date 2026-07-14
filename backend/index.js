import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

dotenv.config();

databaseConnection();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Allowed Origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://netflix-clone-mern-6u9y.vercel.app",
];

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // Postman ya direct requests
      if (!origin) return callback(null, true);

      // Localhost aur production domain allow
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Vercel Preview URLs allow
      if (
        origin.endsWith(".vercel.app") &&
        origin.includes("netflix-clone-mern-6u9y")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// Routes
app.use("/api/v1/user", userRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
