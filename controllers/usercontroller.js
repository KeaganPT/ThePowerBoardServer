const router = require('express').Router();
const {User} = require('../models');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/signup', (req,res) => {
    User.create({
        email: req.body.email,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.user.password, 13)
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

module.exports = router