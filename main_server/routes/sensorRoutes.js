// routes/sensorRoutes.js
const express = require("express");
// const { csvWriterHM, csvWriterRM, csvWriterMT } = require("../Utils/CsvWriter");
const getData = require("./getDataSocket");
const router = express.Router();
let count = 0;
const createRedisClient = require("../Utils/redisClient");
const csvWriter = require("../Utils/CsvWriter"); // Import the csvWriter module
const dotenv = require("dotenv");
dotenv.config();

router.post("/", async (req, res) => {
  const prod_line = Number(process.env.prod_lines);
  let order;
  if (prod_line === 2) {
    order = { HM: 13, RM: 3, MT: 3, total: 16 };
  } else {
    if (prod_line === 1) {
      order = { HM: 7, RM: 2, MT: 3, total: 12 };
    } else {
      order = { HM: 19, RM: 4, MT: 3, total: 23 };
    }
  }
  const client = await createRedisClient();
  let type = req.body.id.slice(0, 2);
  count++;
  let result;
  let value;
  let data;
  switch (type) {
    case "HM":
      result = await client.hGetAll(req.body.id);
      value = Object.values(result)[0];
      if (value !== undefined) {
        data = JSON.parse(value);
        if (data.failure === 0) {
          await client.hSet(req.body.id, req.body.id, JSON.stringify(req.body));
        }
      } else {
        await client.hSet(req.body.id, req.body.id, JSON.stringify(req.body));
      }

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
      result = await client.hGetAll(req.body.id);
      value = Object.values(result)[0];
      if (value !== undefined) {
        data = JSON.parse(value);
        if (data.failure === 0) {
          await client.hSet(req.body.id, req.body.id, JSON.stringify(req.body));
        }
      } else {
        await client.hSet(req.body.id, req.body.id, JSON.stringify(req.body));
      }
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
      result = await client.hGetAll(req.body.id);
      value = Object.values(result)[0];
      if (value !== undefined) {
        data = JSON.parse(value);
        if (data.failure === 0) {
          await client.hSet(req.body.id, req.body.id, JSON.stringify(req.body));
        }
      } else {
        await client.hSet(req.body.id, req.body.id, JSON.stringify(req.body));
      }

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
  if (count === order.total) {
    count = 0;
    console.log("All data has been received !!");
    getData(order);
  }
  res.status(200).json({ message: "Data received successfully" });
});

module.exports = router;
