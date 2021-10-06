const db = require('../models/');

exports.getAll = (req, res, next) => {
db.Wall.findAll()
.then(wall => res.status(201).json( wall))
.catch(err => (res.status(500).json({message: err.message})))
}

exports.getOne = (req, res, next) => {
    db.Wall.findOne({where: {id: req.params.id}})
    .then(wall => res.status(201).json(wall))
}

exports.createPost = (req, res, next) => {
    const post = ({
        
        post: req.body.post
    })
    db.Wall.create(post)
    .then(res.status(201).json(post))
    .catch(err => (res.status(500).json({message: err.message})))
    }

  
    


