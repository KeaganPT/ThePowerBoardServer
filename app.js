require('dotenv').config();

const express = require('express');
const  app = express();
const db = require('./db');

const controllers = require('./controllers')

app.use(express.json())

app.use("/user", controllers.usercontroller)
app.use("/powers", controllers.powerscontroller)
app.use("/character", controllers.charactercontroller)

db.sync();
app.listen(process.env.PORT, function() {
    console.log(`App is listening on ${process.env.PORT}`)
})