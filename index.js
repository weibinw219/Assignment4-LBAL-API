// import the mongoose library
const mongoose = require("mongoose")

// url of your database
const mongoURL = "mongodb+srv://dbUser:0000@cluster0.x7xyu.mongodb.net/LBAL?retryWrites=true&w=majority"

// configuration options to use when connecting to the database
const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}

// connect to the database and check that it worked
mongoose.connect(mongoURL, connectionOptions).then(
    () => {
        console.log("DB connected successfully!")
    }
).catch(
    (err) => {
        console.log("Erro connecting to the DB")
        console.log(err)
    }
)