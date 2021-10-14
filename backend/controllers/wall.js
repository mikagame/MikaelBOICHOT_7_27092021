const db = require('../models/');
const fs = require('fs');



//afficher tous les POSTS
exports.getAll = (req, res, next) => {
db.Wall.findAll()
.then(wall => res.status(201).json( wall))
.catch(err => (res.status(500).json({message: err.message})))
}


//afficher un POST
exports.getOne = (req, res, next) => {
    db.Wall.findOne({where: {id: req.params.id}})
    .then(wall => res.status(201).json(wall))
}


//Créer un POST avec image
exports.createPost = (req, res, next) => {
    console.log(req.body)
    
    const POST = ({
        userId: req.body.id,
        post: req.body.post,
        username: req.body.username,
        imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  
    }) 
    db.Wall.create(POST)
    .then( result => res.status(201).json(result))
    .catch(err => (res.status(500).json({message: err.message})))
    }
//Créer un POST sans image
exports.createPostSansImage = (req, res, next) => {
    console.log(req.body)
    
    const POST = ({
        userId: req.body.id,
        post: req.body.post,
        username: req.body.username,
         imgUrl: null
    }) 
    db.Wall.create(POST)
    .then( result => res.status(201).json(result))
    .catch(err => (res.status(500).json({message: err.message})))
    }


//Supprimer un POST
/* exports.deletePost = (req, res, next) => {
        db.Wall.findOne({ where: {id: req.params.id }})    
        .then(post => {
            
                const filename = post.imgUrl.split('/images/')[1];  
                fs.unlink(`images/${filename}`, () => {
                  db.Wall.destroy({ where: {id: req.params.id }})
                    .then(() => res.status(200).json({ message: 'Post supprimé'}))
                    .catch(error => res.status(400).json({ error }));
                db.Comment.destroy({where: {postId: req.params.id}})
                .then(() => res.status(200).json({ message: 'Commentaires supprimés'}))
                    .catch(error => res.status(400).json({ error }));
                });
            
        })
        .catch(error => res.status(400).json({ error }));   
    }*/

    exports.deletePost = (req, res, next) => {
        db.Wall.findOne({ where: {id: req.params.id }})    
        .then(post => {
            if(post.imgUrl){
                const filename = post.imgUrl.split('/images/')[1];  
                fs.unlink(`images/${filename}`, () => {
                  db.Wall.destroy({ where: {id: req.params.id }})
                    .then(() => res.status(200).json({ message: 'Post supprimé'}))
                    .catch(error => res.status(400).json({ error }));
                db.Comment.destroy({where: {postId: req.params.id}})
                .then(() => res.status(200).json({ message: 'Commentaires supprimés'}))
                    .catch(error => res.status(400).json({ error }));
                });
            }else {
                db.Wall.destroy({ where: {id: req.params.id }})
                .then(() => res.status(200).json({ message: 'Post supprimé'}))
                .catch(error => res.status(400).json({ error }));
            db.Comment.destroy({where: {postId: req.params.id}})
            .then(() => res.status(200).json({ message: 'Commentaires supprimés'}))
                .catch(error => res.status(400).json({ error }));

            }

            
        })
        .catch(error => res.status(400).json({ error }));   
    }







//Modifier un POST
exports.updatePost = (req, res, next) => {
    const postUp = req.file ? {
        userId: req.body.id,
        post: req.body.post,
        username:req.body.username,
        imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
        }: {...req.body}

        db.Wall.update( postUp, {where: {id: req.body.postId}})
        .then(post => res.status(200).json(postUp))
        .catch(err => (res.status(500).json({message: err.message})))

    }

//Afficher les commentaires d'un seul POST
  exports.assoc = (req, res, next) => {
      db.Comment.findAll({where: {postId: req.params.id}})
      .then(e => {
          res.status(200).json(e);
          console.log("ok ok ok ok ok ok ok")
      })
      .catch(err => (res.status(500).json({message: err.message})))
  }
    


