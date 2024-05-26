// const express = require("express");
// const { fetchUserAlerts } = require("../Utils/database");
// const authenticateToken = require("../Middleware/authMiddleware");
// const router = express.Router();

// router.get(
//   "/",
//   (req, res, next) => {
//     authenticateToken(req, res, next, [
//       "admin",
//       "analyste",
//       "technicien",
//       "supervisor",
//     ]);
//   },
//   async (req, res) => {
//     try {
//       fetchUserAlerts()
//         .then((response) => {
//           res.status(200).json(response);
//         })
//         .catch((err) => {
//           res.status(400).json(err);
//         });
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   }
// );

// module.exports = router;
