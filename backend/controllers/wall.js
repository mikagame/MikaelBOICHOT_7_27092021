const db = require('../models/');

exports.getAll = (req, res, next) => {
db.Wall.findAll()
.then(res.status(201).json(req.body))
.catch(err => (res.status(500).json({message: err.message})))
}

exports.createComment = (req, res, next) => {
    const comment = ({
        
        comment: req.body.comment
    })
    db.Wall.create(comment)
    .then(res.status(201).json(comment))
    .catch(err => (res.status(500).json({message: err.message})))
    }
    


