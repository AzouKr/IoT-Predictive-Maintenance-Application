// routes/getDataRoutes.js
const express = require("express");
const createRedisClient = require("../Utils/redisClient");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const client = await createRedisClient();
  const { id } = req.params;
  const result = await client.hGetAll(id);
  const value = Object.values(result)[0];
  const data = JSON.parse(value);
  res.status(200).json(data);
});

module.exports = router;
