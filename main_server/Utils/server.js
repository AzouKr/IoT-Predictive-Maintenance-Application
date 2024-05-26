const { Server: SocketIOServer } = require("socket.io");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  InitializeDB,
  fetchMachineAlerts,
  fetchUserAlerts,
} = require("./database");
const getMachineData = require("./getMachineData");
const getUserEmail = require("../Middleware/getUserEmail");
const getUserRole = require("../Middleware/getUserRole");
const cookie = require("cookie"); // Add this line

InitializeDB();

// Create an Express app
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.6:5173"],
    credentials: true,
  })
);

app.use(bodyParser.json());
// Create the server instance
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: ["http://localhost:5173", "http://192.168.1.6:5173"],
    credentials: true,
  },
});

// Function to convert date to Unix timestamp
function convertToTimestamp(dateString) {
  const date = new Date(dateString);
  return Math.floor(date.getTime() / 1000);
}

const generateDate = (timeStamp) => {
  const d = new Date(timeStamp * 1000);
  const n = d.getDate();
  const m = d.getMonth();
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return { date: `${n} ${monthNames[m]}`, time: timeStamp };
};

function removeDuplicates(array) {
  return [...new Set(array)];
}

// Setting up the socket server
io.on("connection", async (socket) => {
  // // Extract cookies from the socket request headers
  const cookies = cookie.parse(socket.handshake.headers.cookie || "");
  if (cookies.accessToken !== "" && cookies.accessToken !== undefined) {
    const email = await getUserEmail(cookies.accessToken);
    const machineData = await getMachineData();
    io.emit("getData", machineData);
    fetchMachineAlerts(
      await getUserRole(cookies.accessToken),
      await getUserEmail(cookies.accessToken)
    )
      .then((response) => {
        io.emit("getMachineAlerts", response);
      })
      .catch((err) => {
        console.log(err);
      });

    const outputData = [];
    fetchUserAlerts(await getUserEmail(cookies.accessToken))
      .then((response) => {
        response.data.forEach((item) => {
          const object = {
            UTC: "",
            list: [],
          };
          const timestamp = convertToTimestamp(item.date);
          object.UTC = timestamp.toString(); // Assuming you want the last timestamp, adjust as needed
          object.list.push({
            type: item.type, // Assuming 'type' should be "Message"
            desc: item.desc,
            date: item.date,
            timeStamp: timestamp,
          });
          outputData.push(object);
        });
        const dates = [];
        outputData.forEach((item) => {
          dates.push(generateDate(item.UTC).date);
        });
        let uniqueStringArray = removeDuplicates(dates);
        const obj = [];
        uniqueStringArray.forEach((date) => {
          const list = [];
          outputData.forEach((data) => {
            if (date === generateDate(data.UTC).date) {
              list.push(data.list[0]);
            }
          });
          obj.push({ date: date, list: list });
        });
        const finalData = [];
        finalData.push({ count: response.data.length, data: obj });
        io.emit("getUserAlerts/" + email, finalData[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

const sendData = (data) => {
  io.emit("getData", data);
};

const sendMachineAlerts = (data) => {
  io.emit("getMachineAlerts", data);
};

const sendUserAlerts = async (email) => {
  const outputData = [];
  fetchUserAlerts(email)
    .then((response) => {
      response.data.forEach((item) => {
        const object = {
          UTC: "",
          list: [],
        };
        const timestamp = convertToTimestamp(item.date);
        object.UTC = timestamp.toString(); // Assuming you want the last timestamp, adjust as needed
        object.list.push({
          type: item.type, // Assuming 'type' should be "Message"
          desc: item.desc,
          date: item.date,
          timeStamp: timestamp,
        });
        outputData.push(object);
      });
      const dates = [];
      outputData.forEach((item) => {
        dates.push(generateDate(item.UTC).date);
      });
      let uniqueStringArray = removeDuplicates(dates);
      const obj = [];
      uniqueStringArray.forEach((date) => {
        const list = [];
        outputData.forEach((data) => {
          if (date === generateDate(data.UTC).date) {
            list.push(data.list[0]);
          }
        });
        obj.push({ date: date, list: list });
      });
      const finalData = [];
      finalData.push({ count: response.data.length, data: obj });
      io.emit("getUserAlerts/" + email, finalData[0]);
      io.emit("soundAlert", "hi");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { server, sendData, sendMachineAlerts, sendUserAlerts, app };
