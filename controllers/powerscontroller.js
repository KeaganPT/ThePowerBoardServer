const router = require("express").Router();
const { Power, User } = require('../models');
// const Roles = require('../middleware/roles')
// const ac = require('../middleware/roles')
// const grantAccess = require('../middleware/grantAccess')
const validateSession = require('../middleware/validateSession');


router.post('/', validateSession, (req, res) => {

    Power.create({
        powerName: req.body.powerName,
        description: req.body.description,
        userId: req.user.id
    })
        .then(
            function powerCreated(power) {
                res.json({
                    power: power,
                    message: "Your power has been made and added to the database"
                });
            }
        )
        .catch(err => res.status(500).json({ error: err }))
});

router.get('/', (req, res) => {
    Power.findAll({ include: { model: User } })
        .then(powers => res.status(200).json(powers))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/:powerName', validateSession, async (req, res) => {
    try {
        let powers = await Power.findAll({ where: { powerName: req.params.powerName }, include: { model: User } })
        res.status(200).json({
            powers: powers
        })
    } catch (error) {

    }
})



router.put('/:id', validateSession, async (req, res) => {
    try {
        const query = req.params.id;
        let power = await Power.findOne({ where: { id: query } })

        console.log('power: ', power)
        console.log('query', query)

        if (power.userId === req.user.id || req.user.role === 'admin') {
            try {
                
                let powerUpdated = await Power.update(req.body, { where: { id: query } })
                try {
                    let locatedUpdatePower = await Power.findOne({ where: { id: query } })
                        res.status(200).json({
                            power: locatedUpdatePower,
                            message: "Power has been updated.",
                            powerChanged: powerUpdated
                        })
                } catch (error){
                    res.status(500).json(error)
                }
            } catch (error) {
                res.status(500).json({
                    message: error
                })
            }
        } else {
            res.status(401).json('Not allowed bud')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', validateSession, async (req, res) => {
    try {
        let power = await Power.findOne({ where: { id: req.params.id } })
        
        if (power.userId === req.user.id || req.user.role === 'admin') {
            let power = await Power.destroy({
                where: { id: req.params.id }
            })
            res.status(200).json(power)
        } else {
            res.status(401).json('access level not achieved sorry')
        }
    } catch (error) {
           res.status(500).json(error)
    }
})

module.exports = router