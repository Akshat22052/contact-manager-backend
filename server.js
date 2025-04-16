console.log("i am in express project")

const connectDB = require("./config/dbConnections");
const { errorHandler } = require("./middlewares/errorHandler");


const dotenv = require("dotenv").config();
const express = require("express");
// const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

const port = process.env.PORT;

connectDB(); // Connect to MongoDB
console.log("Database connected successfully");

app.use(express.json());    

app.use(errorHandler); // Error handler middleware

app.use("/api/contact",require("./routes/contactRoutes"));


app.use("/api/user",require("./routes/userRoutes")); 







// app.get("/api/contact",(req,res) =>{
//     res.status(200).json({
//         message: "Hello from the contact route"
//     })
// })


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





