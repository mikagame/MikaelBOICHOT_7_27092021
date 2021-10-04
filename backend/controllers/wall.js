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

exports.createComment = (req, res, next) => {
    const comment = ({
        
        comment: req.body.comment
    })
    db.Wall.create(comment)
    .then(res.status(201).json(comment))
    .catch(err => (res.status(500).json({message: err.message})))
    }
    


