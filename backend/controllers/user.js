const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models/');

//enregistrer un utilisateur
exports.signup = (req, res, next) => {
    db.User.findAll()
    .then((result) => {
        
        if(result.length == 0) {   
            
            bcrypt.hash(req.body.password, 10)  // hasher mot de passe
            .then(hash => {
                const user = ({
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    isAdmin: true  // Administrateur  1er user créé
                })
                db.User.create(user)
            .then((res) => res.status(201).json(user))
            .catch(err => (res.status(500).json({message: err.message})))
            })
            .catch(err => (res.status(500).json({message: err.message})))


        }
        else {
           
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = ({
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    isAdmin: false
                })
                db.User.create(user)
            .then(res.status(201).json(user))
            .catch(err => (res.status(500).json({message: err.message})))
            })
            .catch(err => (res.status(500).json({message: err.message})))

        }
    })
   
};

//se connecter 
exports.login = (req, res, next) => {
    db.User.findOne({ where: {email: req.body.email} })
    .then(user => {
        if(!user) {
            return res.status(401).json({ error: 'utilisateur non trouvé'});
           
        }
      console.log(user)
        bcrypt.compare(req.body.password, user.password)
        
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'mot de passe incorrect'});
             
            }
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                ),
                isLogged: true,   
                id: user.id
               
            });
            
            
        })
        .catch(err => (res.status(500).json({message: err.message})))
    })
    .catch(err => (res.status(500).json({message: err.message})))
};


//voir un user
exports.oneUser = (req, res, next) => {
   
    db.User.findOne({where: {id: req.params.id}})
    .then(user => {
        if(!user) {
            return res.status(400).json("erreur")
        }
        return(res.status(201).json(user))
        
})
.catch(err => (res.status(500).json({message: err.message})))
}


//voir tous les users
exports.allUsers = (req, res, next) => {

    db.User.findAll()
    .then(info => res.status(201).json(info))
    .catch(err => (res.status(500).json({message: err.message})))
}

//supprimer un user
exports.deleteUser = (req, res, next) => {
    console.log(req.params)
    db.User.destroy({ where: {id: req.params.id }})
   .then(() => res.status(200).json({ message: 'User supprimé'}))
   .catch(err => (res.status(500).json({message: err.message})))
     
}