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
const Items = mongoose.model("items_table", ItemSchema)



// express setup
const express = require("express");
const app = express();
app.use(express.json())
const HTTP_PORT = process.env.PORT || 8080;





// Homepage
app.get("/", (req, res) => {
    res.send("Welcome to the homepage!")
})

// get all items
app.get("/api/items", (req, res) => {
    Items.find().exec().then(
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


// get specific item by name
app.get("/api/items/:item_name", (req,res) => {
    // retrieve item in the url    
    console.log(req.params)
    let itemName = req.params.item_name;
    
    Items.find().exec().then(
        (results) => {
            for (let i = 0; i < results.length; i++) {
                let singleitem = results[i]
                // ignore any space between or around the string
                if (singleitem.name.toLowerCase().split(" ").join("").trim() === itemName.toLowerCase().split(" ").join("").trim()) {
                    return res.send(singleitem)
                }
            }
            res.status(404).send({msg:`Sorry, could not find item with name: ${itemName}`})
        }
    ).catch(
        (err) => {

            res.status(404).send({msg:"An error has occured!"})
            console.Console(err)
            
        }
    )
   
})

// insert an item
app.post("/api/items", (req, res) => {
    // get the body of the request (body of the request = contain the data the user want sto insert)
    let itemToInsert = req.body
    console.log(`User wants to insert this data: ${itemToInsert.name}`)

    // error handling
    // check to see if the body contains a title and descr
    if ("name" in req.body && "rarity" in req.body) {
        // insert it into the data store (append it to my list of movies)
        Items.create(itemToInsert)
        // respond with a success / error
        res.status(201).send({"msg":"Item successfully inserted!"})
    }
    res.status(401).send({"msg":"Sorry, you are missing a item name or item rarity in your json payload"})    
})

// delete an item
app.delete("/api/items/:item_name", (req,res) => {
    // get the item name
    const itemNameFromUser = req.params.item_name;

    Items.findOneAndDelete({name: itemNameFromUser}).exec().then(
        (deletedStudent) => {
            if (deletedStudent === null) {            
                console.log("Could not find a student to delete")
                res.send({"msg":"Could not find a student to delete"})
            }
            else {
                console.log("Student has been deleted: " + deletedStudent)
                res.send({"msg":`Deleted item with name of ${itemNameFromUser}`})
            } 
        }
    ).catch(
        (err) => {
            res.status(404).send({msg:"An error has occured!"})
            console.log(err)
        }
    )
})

// update by id
app.put("/api/items/:item_id", (req,res) => {
    // I'm too busy right now so here you go
    res.status(501).send("Not implemented")
})




// connect to database & start server
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

