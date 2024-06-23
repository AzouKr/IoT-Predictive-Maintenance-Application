const express = require("express");
const {
  fetchAllUsers,
  modifyUser,
  desactivateUser,
  fetchUserById,
  activateUser,
} = require("../Utils/database");
const authenticateToken = require("../Middleware/authMiddleware");
const sendEmail = require("../Utils/nodeMailer");
const taskEmail = require("../Utils/emails/taskEmail");
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
  "/add",
  (req, res, next) => {
    authenticateToken(req, res, next, ["admin"]);
  },
  async (req, res) => {
    const emails = req.body;
    emails.forEach((email) => {
      activateUser(email)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    });
  }
);

router.post(
  "/delete",
  (req, res, next) => {
    authenticateToken(req, res, next, ["admin"]);
  },
  async (req, res) => {
    const emails = req.body;
    emails.forEach((email) => {
      desactivateUser(email)
        .then((response) => {
          deleteTeamMember(email)
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    });
  }
);

router.post("/healtcheck", async (req, res) => {
  try {
    const body = taskEmail();
    sendEmail("iamazouu@gmail.com", "test", body);
    res.status(200).json("done");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
