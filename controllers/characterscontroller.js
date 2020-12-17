const router = require('express').Router();
const {Character, User} = require('../models');

const validateSession = require('../middleware/validateSession');


router.post('/', validateSession,(req,res) => {
    Character.create({
        characterName: req.body.characterName,
        tags: req.body.tags,
        description: req.body.description,
        userId: req.user.id
    })
    .then(
        function characterCreated(character){
            res.json({
                character: character,
                message: "you're character is real! and in our database"
            });
        }
    )
    .catch(err => res.status(500).json({error: err}))
})

router.get('/', (req, res) => {
    Character.findAll({include: {model: User}})
    .then(characters => res.status(200).json(characters))
    .catch(err => res.status(500).json({error: err}))
})


router.put('/:id', validateSession,(req,res) => {
    const query = req.params.id;
    Character.update(req.body, {where: {id: query}})
    .then((characterUpdated) => {
        Character.findOne({ where: {id: query}})
        .then((locatedUpdateCharacter) => {
            res.status(200).json({
                character: locatedUpdateCharacter,
                message: "Character info has been updated",
                characterChanged: characterUpdated
            })
        })
    })
    .catch((err) => res.json({ error: err}))
});

router.delete('/:id', validateSession, (req,res) => {
    Character.destroy({
        where: {id: req.params.id}
    })
    .then(character => res.status(200).json(character))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router