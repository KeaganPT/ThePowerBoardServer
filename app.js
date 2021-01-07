require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./db');

const controllers = require('./controllers')
app.use(express.json())

app.use(require('./middleware/headers'))

//Controllers
app.use("/user", controllers.usercontroller)
app.use("/powers", controllers.powerscontroller)
app.use("/characters", controllers.charactercontroller)

db.authenticate()
.then(() => db.sync()) // => {force:true}
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server:] App is listening on Port ${process.env.PORT}`));
    })
    .catch((err) => {
        console.log("[server:] Server Crashed");
        console.error(err);
    }) 

