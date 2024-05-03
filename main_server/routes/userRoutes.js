const express = require("express");
const {
  fetchAllUsers,
  modifyUser,
  deleteUser,
  fetchUserById,
} = require("../Utils/database");
const authenticateToken = require("../Middleware/authMiddleware");
const router = express.Router();

router.get(
  "/getall",
  (req, res, next) => {
    authenticateToken(req, res, next, ["admin"]);
  },
  async (req, res) => {
    try {
      const users = await fetchAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
router.get(
  "/getuser",
  (req, res, next) => {
    authenticateToken(req, res, next, ["admin"]);
  },
  async (req, res) => {
    const { id } = req.query;
    try {
      const users = await fetchUserById(id);
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.post(
  "/edit",
  (req, res, next) => {
    authenticateToken(req, res, next, ["admin"]);
  },
  async (req, res) => {
    const { id, name, password, role, age, phone, email, city } = req.body;
    modifyUser(id, name, password, role, age, phone, email, city)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
);
router.post(
  "/delete",
  (req, res, next) => {
    authenticateToken(req, res, next, ["admin"]);
  },
  async (req, res) => {
    const id = req.body;
    id.forEach((ids) => {
      deleteUser(ids)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    });
  }
);

router.get(
  "/healtcheck",
  (req, res, next) => {
    authenticateToken(req, res, next, ["admin"]);
  },
  async (req, res) => {
    try {
      const users = req.user;
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

module.exports = router;
