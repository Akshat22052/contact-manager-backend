const mongoose = require('mongoose');


const connectDB = async () => {
    try{
        console.log("Connecting to MongoDB...");
        const connect = await mongoose.connect(process.env.CONNECTION_STRING); 
        console.log(`MongoDB connected: ${connect.connection.host}`);
        console.log(`MongoDB connected: ${connect.connection.name}`);
        console.log(`MongoDB connected: ${connect.connection.port}`);
        console.log(`MongoDB connected: ${connect.connection.db.databaseName}`);
        console.log(`MongoDB connected: ${connect.connection.readyState}`);
    }
    catch(err){
        console.log("Error connecting to database", err.message); // Log the error message
        process.exit(1); // Exit process with failure

    }
}





// const connectDB = async () => {
//     try {
//         console.log("Connecting to MongoDB...");
//         console.log("Connection String:", process.env.CONNECTION_STRING); // Log the connection string
//         const connect = await mongoose.connect(process.env.CONNECTION_STRING); // No need for deprecated options
//         console.log(`MongoDB connected: ${connect.connection.host}`);
//         console.log(`MongoDB connected: ${connect.connection.name}`);
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err.message); // Log the error message
//         process.exit(1); // Exit process with failure
//     }
// };


module.exports = connectDB; 


