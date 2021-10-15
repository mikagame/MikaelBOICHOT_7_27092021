const db = require('../models/');

//Créer un commentaire
exports.createComment = (req, res, next) => {
  const comment = ({
    userId: req.body.idUser,
    postId: req.body.postId,
    comment: req.body.comment,
    username: req.body.username
  })
  db.Comment.create(comment)
  .then(res.status(201).json(comment))
  .catch(err => (res.status(500).json({message: err.message})))
  }


//Voir tous les commentaires
exports.getAll = (req, res, next) => {
  db.Comment.findAll()
  .then(comment => res.status(201).json( comment))
  .catch(err => (res.status(500).json({message: err.message})))
}



