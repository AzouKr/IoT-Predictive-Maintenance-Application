const fs = require("fs");

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start, end) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  date.setSeconds(Math.floor(Math.random() * 60));
  return date.toISOString().slice(0, 19).replace("T", " ");
}

const machinesLine1 = ["HM1", "HM2", "HM3", "HM4", "HM5", "HM6", "MT1", "RM1"];
const machinesLine2 = [
  "HM7",
  "HM8",
  "HM9",
  "HM10",
  "HM11",
  "HM12",
  "MT2",
  "RM2",
];

const causes = [
  "Overstrain Failure",
  "Heat Dissipation Failure",
  "Power Failure",
  "Tool Wear Failure",
];

// Adjusted degree probabilities
const degrees = ["Risque", "Risque", "Risque", "Risque", "Panne"];

const supervisors = {
  "Line 1": "zeineb.ara@gmail.com",
  "Line 2": "yasmine@gmail.com",
};

const employeesLine1 = [
  "kacirachid@gmail.com",
  "sahlifatiha@gmail.com",
  "meghariamine@gmail.com",
];
const employeesLine2 = [
  "hbnourelhouda@gmail.com",
  "amaramed@gmail.com",
  "benalisamira@gmail.com",
];

const startDate = new Date("2024-01-01T00:00:00");
const endDate = new Date("2024-05-31T23:59:59");

const raports = {
  "Overstrain Failure":
    "Adjusted machine settings to reduce load and prevent overstrain.",
  "Heat Dissipation Failure":
    "Replaced cooling system to improve heat dissipation.",
  "Power Failure":
    "Repaired electrical connections and installed backup power supply.",
  "Tool Wear Failure":
    "Replaced worn tools and calibrated machine for better performance.",
};

function generateAlerts(count) {
  const alerts = [];

  while (alerts.length < count) {
    const line = Math.random() < 0.5 ? "Line 1" : "Line 2";
    const machine =
      line === "Line 1"
        ? getRandomItem(machinesLine1)
        : getRandomItem(machinesLine2);
    const cause = getRandomItem(causes);
    const degree = getRandomItem(degrees);
    const supervisor = supervisors[line];
    const employee =
      line === "Line 1"
        ? getRandomItem(employeesLine1)
        : getRandomItem(employeesLine2);
    const date = getRandomDate(startDate, endDate);
    const rapport = raports[cause];

    const weekNumber = Math.floor(
      (new Date(date) - startDate) / (7 * 24 * 60 * 60 * 1000)
    );
    const alertsInSameWeek = alerts.filter((alert) => {
      const alertDate = new Date(alert.date);
      const alertWeekNumber = Math.floor(
        (alertDate - startDate) / (7 * 24 * 60 * 60 * 1000)
      );
      return alertWeekNumber === weekNumber;
    });

    if (alertsInSameWeek.length < 3) {
      alerts.push({
        machine,
        cause,
        degree,
        status: "done",
        supervisor,
        employee,
        date,
        rapport,
      });
    }
  }

  return alerts;
}

const alerts = generateAlerts(50);

let alertStrings = "";

alerts.forEach((alert) => {
  alertStrings += `"${alert.machine}","${alert.cause}","${alert.degree}","${alert.status}","${alert.supervisor}","${alert.employee}","${alert.date}","${alert.rapport}"\n`;
});

fs.writeFileSync("alerts.txt", alertStrings);

console.log("Alerts have been saved to alerts.txt");

module.exports = generateAlerts;
