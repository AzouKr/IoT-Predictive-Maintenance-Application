// authMiddleware.js
const jwt = require("jsonwebtoken");
const secretKey = require("../config/default");

async function authenticateToken(req, res, next, role) {
  const token = req.header("cookie");
  if (!token) return res.status(401).send("Access Denied");
  const accessToken = token.slice(90);
  try {
    jwt.verify(accessToken, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      if (!role.includes(user.role)) {
        return res.status(401).send("Access Denied");
      }
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = authenticateToken;
