import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import urlroute from "./routes/genrateurl.js";
import userroute from "./routes/userverification.js";

dotenv.config();

const app = express();

// Middleware to read JSON body
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/user", userroute);
app.use("/url", urlroute);

const PORT = process.env.PORT ?? 8000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});