const mongoose = require('mongoose');

const connectToDb = async(req,res) => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connection was successful..");
    }catch(error){
        console.log("Error connecting to database : ",error);
        process.exit(1);
    }
}

module.exports = connectToDb;