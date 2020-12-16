const router = require("express").Router();
const { Power } = require('../models');

router.post('/', (req, res) => {
    Power.create({
        powerName: req.body.powerName,
        description: req.body.description
    })
    .then(
        function powerCreated(power){
            res.json({
                power:power,
                message: "Your power has been made and added to the database"
            });
        }
    )
});


module.exports = router