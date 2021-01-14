const router = require('express').Router();
const {User, Power, Character} = require('../models');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateSession = require('../middleware/validateSession');

router.post('/register', (req,res) => {
    User.create({
        email: req.body.email,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, 13),
        role: req.body.role
    })
    .then(
        function userRegistered(user) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: "user created!",
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err}))
});

//Log in
router.post('/login', function(req,res) {
    console.log('I work heroku please')
    User.findOne({
        where: {
            userName: req.body.userName
        }
    })
    .then(function userLoggedIn(user) {
        if(user) {
            bcrypt.compare(req.body.password, user.password, function (err, matches){
                if(matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                    res.status(200).json({
                        user:user,
                        message: "User logged in successfully",
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ error: "Login failed"})
                }
            });
        } else {
            res.status(500).json({ error: 'Cannot find user info'})
        }
    })
    .catch(err => res.status(500).json({error: err}))
})

router.get('/mine', validateSession, (req,res) => {
    User.findOne({where: {id: req.user.id}, include:[{model: Power }, {model: Character}] })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err}))
})

router.put('/:id', validateSession, (req,res) => {
    const query = req.params.id;
    User.update( {password: bcrypt.hashSync(req.body.password, 13)}, {where: {id: query}})
    .then((userUpdated) => {
        User.findOne({ where: {id: query}}).then((locatedUpdateUser) => {
            res.status(200).json({
                user: locatedUpdateUser,
                message: "user has been updated.",
                userChanged: userUpdated,
            })
        })
    })
    .catch((err) => res.json({ error: err }))
});

module.exports = router