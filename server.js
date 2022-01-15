const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");

// Route Files =>

const bootcamps = require("./routes/bootcamps")

//LOADING ENV VARIABLES =>

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 5000;
const API = process.env.API;


app.use(logger);

// Mounting Routes =>

app.use(API, bootcamps);

app.listen(PORT, function(){
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
