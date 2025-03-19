
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from Next.js frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  }));

// Import routes
const taskRoutes = require("./routes/taskRoutes");

// Use routes
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
