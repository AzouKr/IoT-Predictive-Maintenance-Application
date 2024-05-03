const express = require("express");
const router = express.Router();
const { saveDataset } = require("../Utils/database");

router.post("/upload", (req, res) => {
  const { name } = req.body;
  saveDataset(name)
    .then((response) => {
      if (response.bool) {
        res
          .status(200)
          .json({ bool: true, message: "Dataset saved successfully" });
      } else {
        res.status(400).json({ bool: false, message: "Saving dataset failed" });
      }
    })
    .catch((err) => {
      res.status(400).json({ bool: false, message: err.message });
    });
});

module.exports = router;
