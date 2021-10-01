const db = require('../models/');

exports.getAll = (req, res, next) => {

}

exports.createComment = (req, res, next) => {
    const comment = ({
        
        comment: req.body.comment
    })
    db.Wall.create(comment)
    .then(res.status(201).json(comment))
    .catch(err => (res.status(500).json({message: err.message})))
    }
    


