// routes/sensorRoutes.js
const express = require("express");
// const { csvWriterHM, csvWriterRM, csvWriterMT } = require("../Utils/CsvWriter");
const getData = require("./getDataSocket");
const router = express.Router();
let count = 0;
const createRedisClient = require("../Utils/redisClient");

router.post("/", async (req, res) => {
  const client = await createRedisClient();
  let type = req.body.id.slice(0, 2);
  count++;
  switch (type) {
    case "HM":
      await client.hSet(req.body.id, req.body.id, JSON.stringify(req.body));
      break;
    case "RM":
      await client.hSet(req.body.id, req.body.id, JSON.stringify(req.body));
      break;
    case "MT":
      await client.hSet(req.body.id, req.body.id, JSON.stringify(req.body));
      break;
  }
  if (count == 16) {
    count = 0;
    console.log("All data has been received !!");
    getData();
  }
  res.status(200).json({ message: "Data received successfully" });
});

module.exports = router;
