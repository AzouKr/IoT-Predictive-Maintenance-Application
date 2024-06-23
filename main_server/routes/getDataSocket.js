const createRedisClient = require("../Utils/redisClient");
const { sendData, sendMachineAlerts } = require("../Utils/server");
const Prediction = require("../Utils/Predict");
const {
  createMachineAlert,
  fetchSupervisor,
  fetchMachineAlerts,
} = require("../Utils/database");

function getProductionLine(machineId) {
  switch (machineId.slice(0, 2)) {
    case "HM":
      // Extract the number part from the machine ID
      const machineNumber = parseInt(machineId.replace("HM", ""), 10);

      // Check if the number is within the range for production line 1 or 2
      if (machineNumber >= 1 && machineNumber <= 6) {
        return "Line 1";
      } else {
        if (machineNumber >= 7 && machineNumber <= 12) {
          return "Line 2";
        } else {
          return "Line 3";
        }
      }
      break;
    case "RM":
      // Extract the number part from the machine ID
      const machineNumber1 = parseInt(machineId.replace("RM", ""), 10);

      // Check if the number is within the range for production line 1 or 2
      if (machineNumber1 === 1) {
        return "Line 1";
      } else {
        if (machineNumber1 === 2) {
          return "Line 2";
        } else {
          return "Line 3";
        }
      }
      break;
    case "MT":
      // Extract the number part from the machine ID
      const machineNumber2 = parseInt(machineId.replace("MT", ""), 10);

      // Check if the number is within the range for production line 1 or 2
      if (machineNumber2 === 1) {
        return "Line 1";
      } else {
        if (machineNumber2 === 2) {
          return "Line 2";
        } else {
          return "Line 3";
        }
      }
      break;
  }
}

function getMachineType(machineId) {
  switch (machineId.slice(0, 2)) {
    case "HM":
      return 0;
      break;
    case "RM":
      return 1;
      break;
    case "MT":
      return 2;
      break;
  }
}

const getData = async (order) => {
  const client = await createRedisClient();

  const data = [];
  const data1 = [];

  // Await all the asynchronous operations inside the loops
  await Promise.all([
    (async () => {
      for (let index = 1; index < order.HM; index++) {
        const res = await client.hGetAll(`HM${index}`);
        const value = Object.values(res)[0];
        data1.push(JSON.parse(value));
      }
    })(),
    (async () => {
      for (let index = 1; index < order.MT; index++) {
        const res = await client.hGetAll(`MT${index}`);
        const value = Object.values(res)[0];
        data1.push(JSON.parse(value));
      }
    })(),
    (async () => {
      for (let index = 1; index < order.RM; index++) {
        const res = await client.hGetAll(`RM${index}`);
        const value = Object.values(res)[0];
        data1.push(JSON.parse(value));
      }
    })(),
  ]);

  const data2 = { marche: 0, panne: 0, danger: 0 };
  const num = 50;
  const num2 = 3;

  await Promise.all(
    Array.from({ length: order.total }, async (_, index) => {
      if (data1[index].failure === 0) {
        const randomNumber = Math.floor(Math.random() * 100);
        if (randomNumber === num) {
          data1[index].failure = 1;
          const randomCause = Math.floor(Math.random() * 4);
          let cause;
          switch (randomCause) {
            case 0:
              cause = "Overstrain Failure";
              break;
            case 1:
              cause = "Heat Dissipation Failure";
              break;
            case 2:
              cause = "Power Failure";
              break;
            case 3:
              cause = "Tool Wear Failure";
              break;
          }
          fetchSupervisor(getProductionLine(data1[index].id))
            .then((res) => {
              createMachineAlert(
                data1[index].id,
                cause,
                "Panne",
                res.data[0].supervisor
              )
                .then((res) => {})
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    })
  );

  await Promise.all(
    Array.from({ length: order.total }, async (_, index) => {
      if (data1[index].failure === 0) {
        let type = getMachineType(data1[index].id);
        const data = [
          [
            type,
            data1[index].airTemperature,
            data1[index].processTemperature,
            data1[index].currentRotatinalSpeed,
            data1[index].torque,
            data1[index].toolWear,
          ],
        ];
        try {
          const result = await Prediction(data);
          if (result.type === 0) {
            if (result.result[0] === 1) {
              const randomNumber = Math.floor(Math.random() * 7);
              if (randomNumber === num2) {
                data1[index].failure = 2;
                fetchSupervisor(getProductionLine(data1[index].id))
                  .then((res) => {
                    createMachineAlert(
                      data1[index].id,
                      "None",
                      "Risque",
                      res.data[0].supervisor
                    )
                      .then((res) => {})
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          } else {
            const randomNumber = Math.floor(Math.random() * 7);
            if (randomNumber === num2) {
              if (result.result[0] !== 0) {
                data1[index].failure = 2;
                fetchSupervisor(getProductionLine(data1[index].id))
                  .then((res) => {
                    let cause;
                    switch (result.result[0]) {
                      case 1:
                        cause = "Overstrain Failure";
                        break;
                      case 2:
                        cause = "Heat Dissipation Failure";
                        break;
                      case 3:
                        cause = "Power Failure";
                        break;
                      case 4:
                        cause = "Tool Wear Failure";
                        break;
                    }
                    createMachineAlert(
                      data1[index].id,
                      cause,
                      "Risque",
                      res.data[0].supervisor
                    )
                      .then((res) => {})
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          }
        } catch (error) {
          console.error("Error occurred:", error); // Handle error if necessary
        }
      }
    })
  );

  data.push(data1);

  await Promise.all(
    Array.from({ length: order.total }, async (_, index) => {
      await client.hSet(
        data1[index].id,
        data1[index].id,
        JSON.stringify(data1[index])
      );
    })
  );

  for (let i = 0; i < order.total; i++) {
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
  sendData(data);
  fetchMachineAlerts()
    .then((response) => {
      sendMachineAlerts(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = getData;
