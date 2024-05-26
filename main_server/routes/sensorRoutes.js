// routes/sensorRoutes.js
const express = require("express");
// const { csvWriterHM, csvWriterRM, csvWriterMT } = require("../Utils/CsvWriter");
const getData = require("./getDataSocket");
const router = express.Router();
let count = 0;
const createRedisClient = require("../Utils/redisClient");
const csvWriter = require("../Utils/CsvWriter"); // Import the csvWriter module

router.post("/", async (req, res) => {
  const client = await createRedisClient();
  let type = req.body.id.slice(0, 2);
  count++;
  switch (type) {
    case "HM":
      await client.hSet(req.body.id, req.body.id, JSON.stringify(req.body));
      const records = [
        {
          timestamp: new Date().toISOString(),
          id: req.body.id,
          type: "H",
          airTemperature: req.body.airTemperature,
          processTemperature: req.body.processTemperature,
          currentRotatinalSpeed: req.body.currentRotatinalSpeed,
          torque: req.body.torque,
          toolwear: req.body.toolwear,
          failure: req.body.failure,
        },
      ];
      // Use the csvWriter to write records to the CSV file
      csvWriter
        .writeRecords(records)
        .then(() => {})
        .catch((error) => {
          console.error("Error writing to the CSV file", error);
        });
      break;
    case "RM":
      await client.hSet(req.body.id, req.body.id, JSON.stringify(req.body));
      const records1 = [
        {
          timestamp: new Date().toISOString(),
          id: req.body.id,
          type: "M",
          airTemperature: req.body.airTemperature,
          processTemperature: req.body.processTemperature,
          currentRotatinalSpeed: req.body.currentRotatinalSpeed,
          torque: req.body.torque,
          toolwear: req.body.toolwear,
          failure: req.body.failure,
        },
      ];
      // Use the csvWriter to write records to the CSV file
      csvWriter
        .writeRecords(records1)
        .then(() => {})
        .catch((error) => {
          console.error("Error writing to the CSV file", error);
        });
      break;
    case "MT":
      await client.hSet(req.body.id, req.body.id, JSON.stringify(req.body));
      const records2 = [
        {
          timestamp: new Date().toISOString(),
          id: req.body.id,
          type: "L",
          airTemperature: req.body.airTemperature,
          processTemperature: req.body.processTemperature,
          currentRotatinalSpeed: req.body.currentRotatinalSpeed,
          torque: req.body.torque,
          toolwear: req.body.toolwear,
          failure: req.body.failure,
        },
      ];
      // Use the csvWriter to write records to the CSV file
      csvWriter
        .writeRecords(records2)
        .then(() => {})
        .catch((error) => {
          console.error("Error writing to the CSV file", error);
        });
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
