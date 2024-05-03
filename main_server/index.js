// Import necessary modules
const { server, app } = require("./Utils/server");
const logger = require("./Utils/logger");
// Import routes
const sensorRoutes = require("./routes/sensorRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const pythonRoutes = require("./routes/pythonRoutes");
// const industryRoutes = require("./routes/industryRoutes");
const getData = require("./routes/getDataRoutes");

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/industry", industryRoutes);
app.use("/api/data", getData);
app.use("/api/python", pythonRoutes);

// Start the server and listen on the specified port
server.listen(4000, () => {
  logger.info("Server is running on 4000");
});
