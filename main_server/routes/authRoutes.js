const express = require("express");
const { registerUser, loginUser } = require("../Utils/database");
const router = express.Router();
const roleValidation = require("../Validation/roleValidation");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/default");

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
    const user = { role: response.data.role };
    const token = jwt.sign(user, secretKey);
    // Set the token in response header
    // set a cookie for the jwt
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ auth: true, data: response.data.role });
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

module.exports = router;
