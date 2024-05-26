const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = require("path");
const fs = require("fs");

// Function to get the current date in 'YYYY-MM-DD' format
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Ensure the directory exists
const dir = path.join(__dirname, "../Data");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Create a CSV writer with a filename based on the current date
const csvWriter = createCsvWriter({
  path: path.join(dir, `records_${getCurrentDate()}.csv`),
  header: [
    { id: "timestamp", title: "Date" },
    { id: "id", title: "Machine ID" },
    { id: "type", title: "Type" },
    { id: "airTemperature", title: "Air Temperature" },
    { id: "processTemperature", title: "Process Temperature" },
    { id: "currentRotatinalSpeed", title: "Rotatinal Speed" },
    { id: "torque", title: "Torque" },
    { id: "toolwear", title: "Tool wear" },
    { id: "failure", title: "Failure" },
  ],
});

module.exports = csvWriter;
