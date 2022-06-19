const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const blogModel = require("./Blog");

//middleware
app.use(cors())
// app.use(cookieParser())
app.use(express.json())
//environment variable importing
require('dotenv').config()

const port = process.env.PORT || 5000;

const connect = async () => {
    try {
        // await mongoose.connect(process.env.MONGO);
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oesv8.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Connected to mongoDB.");
        
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oesv8.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        const messageCollection = client.db("genres-agency").collection("message");

        //inserting message
        app.post("/message", async (req, res) => {
            const message = req.body;
            const result = await messageCollection.insertOne(message);
            res.send(result);
        })

        //blog schema
        app.get("/blogs", async (req, res) => {
            const blogs = await blogModel.find({});
            try {
                res.send(blogs);
            } catch (error) {
                res.status(500).send(error);
            }
        });

    } catch (error) {
        console.log(error);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});




app.get('/', (req, res) => {
    res.send('This is GenRes Agency')
})
app.listen(port, () => {
    connect();
    console.log(`Genres is listening to port -> ${port}`)
})