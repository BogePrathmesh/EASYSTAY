const mongoose = require("mongoose"); //this is file is for cleaning first stored data and then inserting data.js file data in this folder
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGOURL=  "mongodb://127.0.0.1:27017/stayeasy"

main().then((result)=>{
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGOURL);
}

const initDb = async ()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:"68d78e482ae180381001ca52"}));
    await Listing.insertMany(initdata.data);
    console.log("Data Was Initialized");
}

initDb();