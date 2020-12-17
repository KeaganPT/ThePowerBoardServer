const router = require('express').Router();
const {Character} = require('../models');

router.post('/', (req,res) => {
    Character.create({
        characterName: req.body.characterName,
        tags: req.body.tags,
        description: req.body.description
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
    Character.findAll()
    .then(characters => res.status(200).json(characters))
    .catch(err => res.status(500).json({error: err}))
})


router.put('/:id', (req,res) => {
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

router.delete('/:id', (req,res) => {
    Character.destroy({
        where: {id: req.params.id}
    })
    .then(character => res.status(200).json(character))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router