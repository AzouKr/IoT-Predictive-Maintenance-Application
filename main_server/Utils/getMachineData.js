const createRedisClient = require("./redisClient");
const dotenv = require("dotenv");
dotenv.config();

const getMachineData = async () => {
  const client = await createRedisClient();
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
  const data = [];
  const data1 = [];

  // Await all the asynchronous operations inside the loops
  await Promise.all([
    (async () => {
      for (let index = 1; index < order.HM; index++) {
        const res = await client.hGetAll(`HM${index}`);
        const value = Object.values(res)[0];
        if (value !== undefined) {
          data1.push(JSON.parse(value));
        }
      }
    })(),
    (async () => {
      for (let index = 1; index < order.MT; index++) {
        const res = await client.hGetAll(`MT${index}`);
        const value = Object.values(res)[0];
        if (value !== undefined) {
          data1.push(JSON.parse(value));
        }
      }
    })(),
    (async () => {
      for (let index = 1; index < order.RM; index++) {
        const res = await client.hGetAll(`RM${index}`);
        const value = Object.values(res)[0];
        if (value !== undefined) {
          data1.push(JSON.parse(value));
        }
      }
    })(),
  ]);

  const data2 = { marche: 0, panne: 0, danger: 0 };

  data.push(data1);
  if (data1.length !== 0) {
    for (let i = 0; i < order.total; i++) {
      if (data1[i] !== undefined) {
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
    }
  }

  data.push(data2);
  return data;
};

module.exports = getMachineData;
