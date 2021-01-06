const router = require('express').Router();
const { Character, User } = require('../models');

const validateSession = require('../middleware/validateSession');


router.post('/', validateSession, (req, res) => {
    Character.create({
        characterName: req.body.characterName,
        tags: req.body.tags,
        description: req.body.description,
        userId: req.user.id
    })
        .then(
            function characterCreated(character) {
                res.json({
                    character: character,
                    message: "you're character is real! and in our database"
                });
            }
        )
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/', (req, res) => {
    Character.findAll({ include: { model: User } })
        .then(characters => res.status(200).json(characters))
        .catch(err => res.status(500).json({ error: err }))
})


router.put('/:id', validateSession, async (req, res) => {
    try {
        
        const query = req.params.id;
        let characterobj = await Character.findOne({ where: { id: query } })
        console.log('charcter: ',characterobj)
        
        if (characterobj.userId === req.user.id || req.user.role === 'admin') {
            
            let characterUpdated = await Character.update(req.body, { where: { id: query } })
                let locatedUpdateCharacter = await Character.findOne({ where: { id: query } })
                    res.status(200).json({
                        character: locatedUpdateCharacter,
                        message: "Character info has been updated",
                        characterChanged: characterUpdated
                    })
        } else {
            res.status(401).json("you shouldn't be doing that")
        }
    } catch (error) {
        
    }
    });

router.delete('/:id', validateSession, async (req, res) => {
    try {
        let character = await Character.findOne({ where: { id: req.params.id } })
        console.log(character)

        if (character.userId === req.user.id || req.user.role === 'admin') {
            let character = await Character.destroy({
                where: { id: req.params.id }
            })
            res.status(200).json(character)
        } else {
            res.status(401).json("you shouldn't be doing that")
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router