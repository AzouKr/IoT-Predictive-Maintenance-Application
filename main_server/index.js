// Import necessary modules
const { server, app } = require("./Utils/server");
const logger = require("./Utils/logger");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("app.db");
const SqliteGuiNode = require("sqlite-gui-node");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// Import routes
const sensorRoutes = require("./routes/sensorRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const machineAlertRoutes = require("./routes/machineAlertRoutes");
const getData = require("./routes/getDataRoutes");

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/machinealert", machineAlertRoutes);
app.use("/api/data", getData);

SqliteGuiNode(db, 3005).catch((err) => {
  console.error("Error starting the server:", err);
});

// Start the server and listen on the specified port
server.listen(4000, () => {
  logger.info("Server is running on 4000");
});
