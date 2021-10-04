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
    db.User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(401).json({ error: 'utilisateur non trouvé'});
        }
        
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'mot de passe incorrect'});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
            
        })
        .catch(err => (res.status(500).json({message: err.message})))
    })
    .catch(err => (res.status(500).json({message: err.message})))
};

/*exports.user = (req, res, next) => {
    db.User.findOne({where: {id: req.params.id}})
    .then(user => {
        if(!user) {
            return res.status(400).json("erreur")
        }
        return(res.status(201).json(user))
        
})
.catch(err => (res.status(500).json({message: err.message})))
}*/