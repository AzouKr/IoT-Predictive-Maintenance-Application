const jwt = require("jsonwebtoken");
const secretKey = require("../config/default");

async function getUserEmail(token) {
  if (!token) {
    throw new Error("Access Denied");
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        reject("Forbidden");
      } else {
        resolve(user.email);
      }
    });
  });
}

module.exports = getUserEmail;
