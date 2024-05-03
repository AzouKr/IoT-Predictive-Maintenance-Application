const createRedisClient = require("../Utils/redisClient");
const { sendData } = require("../Utils/server");
const Prediction = require("../Utils/Predict");

const getData = async () => {
  const client = await createRedisClient();

  const data = [];
  const data1 = [];
  const data2 = [];
  const data3 = [];

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
        const res = await client.hGetAll(`RM${index}`);
        const value = Object.values(res)[0];
        data2.push(JSON.parse(value));
      }
    })(),
    (async () => {
      for (let index = 1; index < 3; index++) {
        const res = await client.hGetAll(`MT${index}`);
        const value = Object.values(res)[0];
        data3.push(JSON.parse(value));
      }
    })(),
  ]);

  const data4 = { marche: 0, panne: 0, danger: 0 };

  await Promise.all(
    Array.from({ length: 12 }, async (_, index) => {
      const data = [
        [
          0,
          data1[index].airTemperature,
          data1[index].processTemperature,
          data1[index].currentRotatinalSpeed,
          data1[index].torque,
          data1[index].toolWear,
        ],
      ];
      try {
        const result = await Prediction(data);
        if (result === 1) {
          data1[index].failure = 2;
        }
      } catch (error) {
        console.error("Error occurred:", error); // Handle error if necessary
      }
    })
  );

  await Promise.all(
    Array.from({ length: 2 }, async (_, index) => {
      const data = [
        [
          1,
          data2[index].airTemperature,
          data2[index].processTemperature,
          data2[index].currentRotatinalSpeed,
          data2[index].torque,
          data2[index].toolWear,
        ],
      ];
      try {
        const result = await Prediction(data);
        if (result === 1) {
          data2[index].failure = 2;
        }
      } catch (error) {
        console.error("Error occurred:", error); // Handle error if necessary
      }
    })
  );
  await Promise.all(
    Array.from({ length: 2 }, async (_, index) => {
      const data = [
        [
          2,
          data3[index].airTemperature,
          data3[index].processTemperature,
          data3[index].currentRotatinalSpeed,
          data3[index].torque,
          data3[index].toolWear,
        ],
      ];
      try {
        const result = await Prediction(data);
        if (result === 1) {
          data3[index].failure = 2;
        }
      } catch (error) {
        console.error("Error occurred:", error); // Handle error if necessary
      }
    })
  );

  data.push(data1);
  data.push(data2);
  data.push(data3);

  for (let index = 0; index < 3; index++) {
    for (let i = 0; i < data[index].length; i++) {
      const array = data[index];
      switch (array[i].failure) {
        case 0:
          data4.marche = data4.marche + 1;
          break;
        case 1:
          data4.panne = data4.panne + 1;
          break;
        case 2:
          data4.danger = data4.danger + 1;
          break;
      }
    }
  }
  data.push(data4);
  sendData(data);
};
module.exports = getData;
