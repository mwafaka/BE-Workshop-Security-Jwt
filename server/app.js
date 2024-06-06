
import dotenv from 'dotenv';
dotenv.config();
import connect from './config/database.js';
connect()
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import User from "./model/user.js";
import auth from "./middleware/auth.js";

const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password  } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send(req.body);
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login ");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        } 
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.post("/logout", auth, async (req, res) => {
  try {
    // Get the user from the request object
    const user = req.user;
    // Clear the user's token (logout)
    user.token = null;
  /*   await user.save(); */
    // Send a success message
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌  ");
});

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});


app.listen(port, () => {
  console.log(`Server running on  port ${port}`);
});


