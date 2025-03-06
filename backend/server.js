const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5001;

// ✅ Configure CORS policy
const corsOptions = {
  origin: "https://my-app-sepia-iota.vercel.app", // ✅ Allow frontend
  methods: "GET, POST", // ✅ Allowed request methods
  allowedHeaders: "Content-Type", // ✅ Allowed headers
  credentials: true, // ✅ Allow cookies if needed
};

app.use(cors(corsOptions)); // ✅ Use CORS with specific options

// Middleware
app.use(bodyParser.json());



// Connect to MongoDB
mongoose
  .connect("mongodb+srv://mariannao335:0F2725b0a958@marianna.ybhusd5.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define a Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  result: String,
});

const User = mongoose.model("User", userSchema);

// API Route to Save User Data
app.post("/save-user", async (req, res) => {
  const { name, email, result } = req.body;
  if (!name || !email || !result) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = new User({ name, email, result });
    await newUser.save();
    res.status(200).json({ message: "Data saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

// API Route to Retrieve All Users
app.get("/get-users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
