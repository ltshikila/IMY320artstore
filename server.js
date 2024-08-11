const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database connection
mongoose.connect('mongodb+srv://ltshikila17:d2HO4CGFT8kZDy40@imy320artstore.osue4xj.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() =>{
    console.log("db connection success");
  }).catch((error) =>{
    console.log("db connection error", error);
  });
//Server connection
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const User = require("./models/user");

app.post("/register", async (req, res) => {
  try {
    const {username, email, password} = req.body;

    // Check if the email of account type is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({
      username, 
      email, 
      password
    });

    // Save the user to the database
    await newUser.save();
    console.log("New User Registered:", newUser);

    res.status(201).json({
      message:
        "Registration successful.",
    });
  } catch (error) {
    console.log("Error during registration:", error); // Debugging statement
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email does not exist" });
    }

    // Compare the provided password with the db password
    if (password != user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login success" });
  } catch (error) {
    console.log("Error during login:", error);
    res.status(500).json({ message: "Login Failed" });
  }
});
