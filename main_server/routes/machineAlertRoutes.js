const express = require("express");
const {
  assignMachineAlerts,
  fetchMachineAlerts,
  updateMachineAlerts,
  createUserAlert,
  fetchMachineAlertsById,
} = require("../Utils/database");
const authenticateToken = require("../Middleware/authMiddleware");
const taskEmail = require("../Utils/emails/taskEmail");
const logger = require("../Utils/logger");
const sendEmail = require("../Utils/nodeMailer");
const updateMachine = require("../Utils/updateMachine");
const { sendUserAlerts } = require("../Utils/server");
const router = express.Router();

router.get(
  "/",
  (req, res, next) => {
    authenticateToken(req, res, next, ["supervisor"]);
  },
  async (req, res) => {
    try {
      fetchMachineAlerts()
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    fetchMachineAlertsById(id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post(
  "/assign",
  (req, res, next) => {
    authenticateToken(req, res, next, ["supervisor"]);
  },
  async (req, res) => {
    const { employee, machine } = req.body;
    try {
      assignMachineAlerts(employee.email, machine)
        .then((response) => {
          createUserAlert(
            "TASK",
            "You have been assigned new task",
            employee.email
          )
            .then(() => {
              sendUserAlerts(employee.email)
                .then()
                .catch((err) => {
                  logger.error(err);
                });
            })
            .catch((err) => {
              logger.error(err);
            });
          const body = taskEmail();
          sendEmail(element.email, "TASK ASSIGNED", body);
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.post(
  "/update",
  (req, res, next) => {
    authenticateToken(req, res, next, ["technicien"]);
  },
  async (req, res) => {
    const { machine, rapport, id } = req.body;
    try {
      updateMachineAlerts(id, rapport)
        .then((response) => {
          updateMachine(machine)
            .then(() => {
              res.status(200).json(response);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

module.exports = router;
