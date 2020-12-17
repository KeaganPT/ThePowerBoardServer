const router = require("express").Router();
const { Power } = require('../models');

const validateSession = require('../middleware/validateSession');


router.post('/', validateSession,(req, res) => {
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
    .catch(err => res.status(500).json({error: err}))
});

router.get('/', (req,res) => {
    Power.findAll()
    .then(powers => res.status(200).json(powers))
    .catch(err => res.status(500).json({ error: err}))
})

router.put('/:id', validateSession, (req,res) => {
    const query = req.params.id;
    Power.update(req.body, {where: {id: query}})
    .then((powerUpdated) => {
        Power.findOne({ where: {id: query}}).then((locatedUpdatePower) => {
            res.status(200).json({
                power: locatedUpdatePower,
                message: "Power has been updated.",
                powerChanged: powerUpdated
            })
        })
    })
    .catch((err) => res.json({ error: err }))
});

router.delete('/:id', validateSession,(req, res) => {
    Power.destroy({
        where: {id: req.params.id}
    })
    .then(power => res.status(200).json(power))
    .catch(err => res.json({ error: err}))
})

module.exports = router