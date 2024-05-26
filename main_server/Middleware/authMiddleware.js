// authMiddleware.js
const jwt = require("jsonwebtoken");
const secretKey = require("../config/default");

async function authenticateToken(req, res, next, role) {
  var token = req.cookies.accessToken;
  if (!token) return res.status(401).send("Access Denied");
  try {
    jwt.verify(token, secretKey, (err, user) => {
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
