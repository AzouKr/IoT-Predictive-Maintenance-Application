const express = require("express");
const authenticateToken = require("../Middleware/authMiddleware");
const { addEvent, fetchEvents, deleteEvent } = require("../Utils/database");
const router = express.Router();

router.post(
  "",
  (req, res, next) => {
    authenticateToken(req, res, next, [
      "admin",
      "analyste",
      "technicien",
      "supervisor",
    ]);
  },
  async (req, res) => {
    try {
      const { title, user, date } = req.body;
      addEvent(title, user, date)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.post(
  "/event",
  (req, res, next) => {
    authenticateToken(req, res, next, [
      "admin",
      "analyste",
      "technicien",
      "supervisor",
    ]);
  },
  async (req, res) => {
    try {
      const { user } = req.body;
      fetchEvents(user)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.post(
  "/delete",
  (req, res, next) => {
    authenticateToken(req, res, next, [
      "admin",
      "analyste",
      "technicien",
      "supervisor",
    ]);
  },
  async (req, res) => {
    try {
      const { id } = req.body;
      deleteEvent(id)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

module.exports = router;
