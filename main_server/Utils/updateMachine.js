const createRedisClient = require("./redisClient");

const updateMachine = async (id) => {
  const client = await createRedisClient();
  const result = await client.hGetAll(id);
  const value = Object.values(result)[0];
  const data = JSON.parse(value);
  const newData = {
    id: data.id,
    airTemperature: data.airTemperature,
    processTemperature: data.processTemperature,
    currentRotatinalSpeed: data.currentRotatinalSpeed,
    toolWear: data.toolWear,
    torque: data.torque,
    failure: 0,
  };
  await client.hSet(newData.id, newData.id, JSON.stringify(newData));
};

module.exports = updateMachine;
