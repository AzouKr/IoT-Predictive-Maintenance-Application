const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Create a CSV writer
const csvWriterHm = createCsvWriter({
  path: "./Data/hydro_machines.csv",
  header: [
    { id: "timestamp", title: "Date" },
    { id: "id", title: "Machine ID" },
    { id: "airtemperature", title: "Air Temperature" },
    { id: "processtemperature", title: "Process Temperature" },
    { id: "toolwear", title: "Tool wear" },
    { id: "failure", title: "Failure" },
  ],
});

const csvWriterRm = createCsvWriter({
  path: "./Data/rotational_machines.csv",
  header: [
    { id: "timestamp", title: "Date" },
    { id: "id", title: "Machine ID" },
    { id: "airtemperature", title: "Air Temperature" },
    { id: "processtemperature", title: "Process Temperature" },
    { id: "rotationalspeed", title: "Rotational Speed" },
    { id: "vibration1", title: "Vibration 1" },
    { id: "vibration2", title: "Vibration 2" },
    { id: "vibration3", title: "Vibration 3" },
    { id: "vibration4", title: "Vibration 4" },
    { id: "load", title: "Load" },
    { id: "failure", title: "Failure" },
  ],
});

const csvWriterMt = createCsvWriter({
  path: "./Data/machines_tool.csv",
  header: [
    { id: "timestamp", title: "Date" },
    { id: "id", title: "Machine ID" },
    { id: "airtemperature", title: "Air Temperature" },
    { id: "processtemperature", title: "Process Temperature" },
    { id: "rotationalspeed", title: "Rotational Speed" },
    { id: "vibration1", title: "Vibration 1" },
    { id: "vibration2", title: "Vibration 2" },
    { id: "vibration3", title: "Vibration 3" },
    { id: "vibration4", title: "Vibration 4" },
    { id: "load", title: "Load" },
    { id: "toolwear", title: "Tool wear" },
    { id: "failure", title: "Failure" },
  ],
});

function csvWriterRM(machineRecord) {
  csvWriterRm
    .writeRecords([machineRecord])
    .catch((error) => console.error("Error writing to CSV file:", error));
}
function csvWriterHM(machineRecord) {
  csvWriterHm
    .writeRecords([machineRecord])
    .catch((error) => console.error("Error writing to CSV file:", error));
}
function csvWriterMT(machineRecord) {
  csvWriterMt
    .writeRecords([machineRecord])
    .catch((error) => console.error("Error writing to CSV file:", error));
}

module.exports = { csvWriterRM, csvWriterHM, csvWriterMT };
