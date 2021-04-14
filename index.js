// import the mongoose library
const mongoose = require("mongoose")

// url of your database
const mongoURL = "mongodb+srv://dbUser:0000@cluster0.x7xyu.mongodb.net/LBAL?retryWrites=true&w=majority"

// configuration options to use when connecting to the database
const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}

// add your table schemas
const Schema = mongoose.Schema

const ItemSchema = new Schema({
   name:String,
   rarity:String,
   description:String,
   goldPerTurn:Number
})
const Item = mongoose.model("items_table", ItemSchema)



// express setup
const express = require("express");
const app = express();
app.use(express.json())
const HTTP_PORT = process.env.PORT || 8080;




// Url endpoints
// Homepage
app.get("/", (req, res) => {
    res.send("Welcome to the homepage!")
})

// GET ALL
app.get("/api/items", (req, res) => {
    Item.find().exec().then(
        (results) => {
            console.log(results)
            res.send(results)
        }
    ).catch(
        (err) => {
            console.Console(err)
            
        }
    )
    
})

// /api/movies/3
// --> should return movie with id 3
app.get("/api/movies/:item_name", (req,res) => {
    // 1. retrieve the movieID in the url    
    console.log(req.params)
    let itemName = req.params.item_name;
    
    Item.find().exec().then(
        (results) => {
            console.log(results)

            for (let i = 0; i < results.length; i++) {
                let item = results[i]
                if (item.item === itemName) {
                        // 3. if you can find it, then return it
                    return res.send(item)
                }
            }

            res.status(404).send({msg:`Sorry, could not find movie with id: ${item}`}) 
        }
    ).catch(
        (err) => {
            console.Console(err)
            
        }
    )


    // 2. Search your list of movies for a movie that matches that id
    // get a list of all the parameters in your request
    for (let i = 0; i < upcomingMovies.length; i++) {
        let movie = upcomingMovies[i]
        if (movie.id === id) {
                // 3. if you can find it, then return it
            return res.send(movie)
        }
    }

    // 4. if you cannot find it, then return an error message & appropriate status code
    res.status(404).send({msg:`Sorry, could not find movie with id: ${id}`})    
})








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

