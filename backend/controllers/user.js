const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models/');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = ({
            email: req.body.email,
            username: req.body.username,
            password: hash
        })
        db.User.create(user)
    .then(res.status(201).json(user))
    .catch(err => (res.status(500).json({message: err.message})))
    })
    .catch(err => (res.status(500).json({message: err.message})))
};

exports.login = (req, res, next) => {

};

exports.user = (req, res, next) => {
    db.User.findOne({where: {id: req.params.id}})
    .then(user => {
        if(!user) {
            return res.status(400).json("erreur")
        }
        return(res.status(201).json(user))
        
})
.catch(err => (res.status(500).json({message: err.message})))
}