require('dotenv').config();

const express = require('express');
const  app = express();
const db = require('./db');

const controllers = require('./controllers')

app.use(express.json())

app.use("/powers", controllers.powerscontroller)

db.sync();
app.listen(process.env.PORT, function() {
    console.log(`App is listening on ${process.env.PORT}`)
})