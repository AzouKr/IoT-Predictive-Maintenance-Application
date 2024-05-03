const express = require("express");
const { modifyIndustryState, getState } = require("../Utils/database");
const router = express.Router();

router.post("/active", (req, res) => {
  const state = req.body.state;
  modifyIndustryState(state);
  res.status(200).json({ message: "State modified successfully" });
});

router.get("/state", async (req, res) => {
  await getState()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});
module.exports = router;
