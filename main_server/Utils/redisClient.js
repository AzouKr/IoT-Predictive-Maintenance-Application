// redisClient.js
const { createClient } = require("redis");
const logger = require("./logger");

async function createRedisClient() {
  const client = await createClient()
    .on("error", (err) => logger.error("Redis Client Error", err))
    .connect();

  return client;
}

module.exports = createRedisClient;
