/* configures the backend express server */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes"); // Assuming this contains your registration route
const taskRoutes = require("./routes/taskRoutes"); // Assuming this handles task-related routes
const cors = require("cors");

dotenv.config();

// Set up database connection
mongoose
  .connect(process.env.DB_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Set up port to listen on
const port = process.env.PORT || 8080;

app.use(express.json()); // Middleware to parse JSON bodies

// Enable CORS to prevent CORS-related errors
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this based on your frontend's URL
    credentials: true, // Allow credentials to be sent
  })
);

// Handle routes
app.use("/todos", authRoutes); // Auth routes (e.g., register, login)
app.use("/todos", taskRoutes); // Task-related routes

// Start the server
app.listen(port, () => console.log(`Listening on port ${port}...`));
