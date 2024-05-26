const express = require("express");
const {
  registerUser,
  loginUser,
  updatePassword,
} = require("../Utils/database");
const router = express.Router();
const roleValidation = require("../Validation/roleValidation");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/default");
const passEmail = require("../Utils/emails/passEmail");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../Utils/nodeMailer");

// Dummy database to store tokens
const tokens = new Set();

router.post("/register", async (req, res) => {
  const { name, password, role, age, phone, email, city } = req.body;

  if (!roleValidation(role)) {
    res.status(400).json({ error: "Invalid role type" });
    return;
  }

  registerUser(name, password, role, age, phone, email, city)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await loginUser(email, password);
    const user = { role: response.data.role, email: response.data.email };
    const token = jwt.sign(user, secretKey);
    // Set the token in response header
    // set a cookie for the jwt
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({
      auth: true,
      data: response.data.role,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ auth: false, error: error.message });
  }
});

router.post("/reset", async (req, res) => {
  const { email, password } = req.body;
  try {
    updatePassword(email, password)
      .then((response) => {
        res.status(200).json({ bool: true, data: response });
      })
      .catch((err) => {
        res.status(500).json({ bool: false, data: err });
      });
  } catch (error) {
    res.status(400).json({ auth: false, error: error.message });
  }
});

// Logout endpoint
router.delete("/logout", async (req, res) => {
  try {
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// generate reset link endpoint
router.post("/link/genreate", async (req, res) => {
  try {
    const { email } = req.body;
    // Generate a unique token
    const token = uuidv4();
    // Store the token in the database
    tokens.add(token);

    const link = "http://localhost:5173/resetpassword/" + email + "/" + token;
    const body = passEmail(link);
    sendEmail(email, "Password Reset Request", body);
    res.status(200).json({ bool: true });
  } catch (error) {
    res.status(500).json({ bool: true, message: "Internal server error" });
  }
});

// generate reset link endpoint
router.get("/link/genreate/:token", async (req, res) => {
  try {
    const { token } = req.params;
    if (tokens.has(token)) {
      tokens.delete(token);
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    res.status(500).json({ bool: true, message: "Internal server error" });
  }
});

module.exports = router;
