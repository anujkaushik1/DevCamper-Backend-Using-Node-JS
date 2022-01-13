const express = require("express");
const dotenv = require("dotenv");

//LOADING ENV VARIABLES =>

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 5000;


app.listen(PORT, function(){
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
