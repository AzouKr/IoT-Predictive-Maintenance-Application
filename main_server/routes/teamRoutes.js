const express = require("express");
const {
  fetchAvailableUsers,
  createTeam,
  addTeamMember,
  deleteTeamMember,
  createUserAlert,
  fetchTeams,
  fetchTeamBySupervisor,
  fetchTeamUsers,
  fetchTeamsList,
} = require("../Utils/database");
const authenticateToken = require("../Middleware/authMiddleware");
const logger = require("../Utils/logger");
const sendEmail = require("../Utils/nodeMailer");
const teamAddEmail = require("../Utils/emails/teamAddEmail");
const teamDeleteEmail = require("../Utils/emails/teamDeleteEmail");
const { sendUserAlerts } = require("../Utils/server");
const router = express.Router();

router.get(
  "/availableuser",
  (req, res, next) => {
    authenticateToken(req, res, next, ["supervisor"]);
  },
  async (req, res) => {
    try {
      const users = await fetchAvailableUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.get(
  "/availableworker",
  (req, res, next) => {
    authenticateToken(req, res, next, ["supervisor"]);
  },
  async (req, res) => {
    try {
      const team = await fetchTeamBySupervisor(req.user.email);
      if (team.data !== undefined) {
        fetchTeamUsers(team.data.name)
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        res.status(200).json({ bool: true, data: [] });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.get(
  "/one",
  (req, res, next) => {
    authenticateToken(req, res, next, ["supervisor"]);
  },
  async (req, res) => {
    try {
      const team = await fetchTeamBySupervisor(req.user.email);
      if (team.data !== undefined) {
        res.status(200).json(team);
      } else {
        res.status(200).json({ bool: true, data: [] });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.get(
  "/",
  (req, res, next) => {
    authenticateToken(req, res, next, ["admin"]);
  },
  async (req, res) => {
    try {
      const users = await fetchTeams();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.get(
  "/list",
  (req, res, next) => {
    authenticateToken(req, res, next, ["admin"]);
  },
  async (req, res) => {
    try {
      const teams = await fetchTeams();
      const teamNames = teams.data.map((team) => team.name);
      const users = await fetchTeamsList(teamNames);
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.post(
  "/createteam",
  (req, res, next) => {
    authenticateToken(req, res, next, ["supervisor"]);
  },
  async (req, res) => {
    const { name, prodLine, members } = req.body;
    try {
      createTeam(name, prodLine, req.user.email)
        .then((response) => {
          members.forEach((member) => {
            addTeamMember(name, member)
              .then((response) => {
                logger.info("Member added successfully");
                createUserAlert("TEAM", "You have been added to a team", member)
                  .then(() => {
                    sendUserAlerts(member)
                      .then()
                      .catch((err) => {
                        logger.error(err);
                      });
                  })
                  .catch((err) => {
                    logger.error(err);
                  });
                const body = teamAddEmail(name);
                sendEmail(member, "Added TO NEW TEAM", body);
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          });
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
  "/add",
  (req, res, next) => {
    authenticateToken(req, res, next, ["supervisor"]);
  },
  async (req, res) => {
    const { name, members } = req.body;
    try {
      members.forEach((member) => {
        addTeamMember(name, member)
          .then((response) => {
            logger.info("Member added successfully");
            createUserAlert("TEAM", "You have been added to a team", member)
              .then(() => {
                sendUserAlerts(member)
                  .then()
                  .catch((err) => {
                    logger.error(err);
                  });
              })
              .catch((err) => {
                logger.error(err);
              });
            const body = teamAddEmail(name);
            sendEmail(member, "Added TO NEW TEAM", body);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.post(
  "/delete",
  (req, res, next) => {
    authenticateToken(req, res, next, ["supervisor"]);
  },
  async (req, res) => {
    const { email } = req.body;
    try {
      deleteTeamMember(email)
        .then((response) => {
          createUserAlert("TEAM", "You have removed from your team", email)
            .then(() => {
              sendUserAlerts(email)
                .then()
                .catch((err) => {
                  logger.error(err);
                });
            })
            .catch((err) => {
              logger.error(err);
            });
          const body = teamDeleteEmail();
          sendEmail(email, "REMOVED FROM TEAM", body);
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

module.exports = router;
