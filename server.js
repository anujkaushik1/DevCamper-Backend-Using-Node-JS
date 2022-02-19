const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const connectDB = require("./config/db");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// Loading Env Variables =>

dotenv.config({ path: "./config/config.env" });

// Connect to Database =>

connectDB();

// Route Files =>

const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const app = express();

// Body Parser =>
app.use(express.json());

// Cookie parser
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use(logger);

// File Upload =>

app.use(fileupload());

// Set static folder =>

app.use(express.static(path.join(__dirname, "public")));

// Mounting Routes =>

app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

const server = app.listen(PORT, function () {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

// Handle Unhandled Promise Rejection =>

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
