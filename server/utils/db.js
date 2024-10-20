const mongoose = require('mongoose')

const URI = "mongodb://localhost:27017/codeEditor"


const connectDb = async () =>{
    try {
        await mongoose.connect(URI)
        console.log("Connection Sucessfull to DB");
        
    } catch (error) {
        console.error("Connection Failed");
        process.exit(0);
    }
}


module.exports = connectDb;