const db = require('../models/');

  exports.createComment = (req, res, next) => {

    const comment = ({
        userId: req.body.idUser,
        postId: req.body.postId,
        comment: req.body.comment
    })
    db.Comment.create(comment)
    .then(res.status(201).json(comment))
    .catch(err => (res.status(500).json({message: err.message})))
    }

    exports.getAll = (req, res, next) => {
     
        db.Comment.findAll()
        .then(comment => res.status(201).json( comment))
        .catch(err => (res.status(500).json({message: err.message})))
        }


/*exports.getComment = (req, res, next) => {

  db.Wall.findOne(where: {id: req.})
  .then()
  .catch()
}*/