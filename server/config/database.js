const mongoose=require("mongoose");
const dotenv = require("dotenv");


dotenv.config();


const DB = process.env.DB_URL;mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to MongoDB");
    console.log("Database Name:", mongoose.connection.db.databaseName);
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
