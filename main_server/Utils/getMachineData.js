const createRedisClient = require("./redisClient");

const getMachineData = async () => {
  const client = await createRedisClient();

  const data = [];
  const data1 = [];

  // Await all the asynchronous operations inside the loops
  await Promise.all([
    (async () => {
      for (let index = 1; index < 13; index++) {
        const res = await client.hGetAll(`HM${index}`);
        const value = Object.values(res)[0];
        data1.push(JSON.parse(value));
      }
    })(),
    (async () => {
      for (let index = 1; index < 3; index++) {
        const res = await client.hGetAll(`MT${index}`);
        const value = Object.values(res)[0];
        data1.push(JSON.parse(value));
      }
    })(),
    (async () => {
      for (let index = 1; index < 3; index++) {
        const res = await client.hGetAll(`RM${index}`);
        const value = Object.values(res)[0];
        data1.push(JSON.parse(value));
      }
    })(),
  ]);

  const data2 = { marche: 0, panne: 0, danger: 0 };

  data.push(data1);

  for (let i = 0; i < 16; i++) {
    switch (data1[i].failure) {
      case 0:
        data2.marche = data2.marche + 1;
        break;
      case 1:
        data2.panne = data2.panne + 1;
        break;
      case 2:
        data2.danger = data2.danger + 1;
        break;
    }
  }

  data.push(data2);
  return data;
};

module.exports = getMachineData;
