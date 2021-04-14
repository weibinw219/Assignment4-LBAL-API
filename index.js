// import the mongoose library
const mongoose = require("mongoose")

// url of your database
const mongoURL = "mongodb+srv://dbUser:0000@cluster0.x7xyu.mongodb.net/LBAL?retryWrites=true&w=majority"

// configuration options to use when connecting to the database
const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}


// express setup
const express = require("express");
const app = express();
app.use(express.json())
const HTTP_PORT = process.env.PORT || 8080;



// connect to database & start server
// ----------------------------------
const onHttpStart = () => {
    console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}


// connect to the database and check that it worked
mongoose.connect(mongoURL, connectionOptions).then(
    () => {
        console.log("DB connected successfully!")
        app.listen(HTTP_PORT, onHttpStart); 
    }
).catch(
    (err) => {
        console.log("Erro connecting to the DB")
        console.log(err)
    }
)

