const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load env variables =>
dotenv.config({path : "./config/config.env"});

// Load Models =>
const Bootcamp = require("./models/Bootcamp.js");

// Connect to DB =>
mongoose.connect(process.env.MONGO_URI);

//Read JSON Files =>
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamp.json`, "utf-8")
);

// Import into DB =>
const importData = async function(){
    try {     
        await Bootcamp.create(bootcamps);
        console.log("Data Imported...".green.inverse);

    } catch (err) {
        console.error(err);
    }
}

// Delete Data =>
const deleteData = async function(){
    try {     
        await Bootcamp.deleteMany();
        console.log("Data Destroyed...".red.inverse);

    } catch (err) {
        console.error(err);
    }
}


if(process.argv[2] === "-i"){
    importData();

}else if(process.argv[2] === "-d"){
    deleteData();
}