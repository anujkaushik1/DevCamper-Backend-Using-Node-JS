const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const connectDB = require("./config/db");

// Loading Env Variables =>

dotenv.config({ path: "./config/config.env" });

// Connect to Database =>

connectDB();


// Route Files =>

const bootcamps = require("./routes/bootcamps")

const app = express();
const PORT = process.env.PORT || 5000;
const API = process.env.API;


app.use(logger);

// Mounting Routes =>

app.use(API, bootcamps);

const server = app.listen(PORT, function(){
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})

// Handle Unhandled Promise Rejection =>

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});

