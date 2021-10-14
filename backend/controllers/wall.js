const db = require('../models/');
const fs = require('fs');

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
    console.log(req.body)
    const POST = ({
        userId: req.body.id,
        post: req.body.post,
        username: req.body.username,
        imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`      //${req.body.imgUrl} ${req.file.filename}
    }) 
    db.Wall.create(POST)
    .then( result => res.status(201).json(result))
    .catch(err => (res.status(500).json({message: err.message})))
    }

    exports.deletePost = (req, res, next) => {
        db.Wall.findOne({ where: {id: req.params.id }})    
        .then(post => {
            
                const filename = post.imgUrl.split('/images/')[1];  
                fs.unlink(`images/${filename}`, () => {
                  db.Wall.destroy({ where: {id: req.params.id }})
                    .then(() => res.status(200).json({ message: 'Post supprimé'}))
                    .catch(error => res.status(400).json({ error }));
                });
            
        })
        .catch(error => res.status(400).json({ error }));   
    }


    exports.updatePost = (req, res, next) => {
        db.Wall.update({where: {id: req.body.id}})
        .then()
        .catch()

    }

  exports.assoc = (req, res, next) => {
      db.Comment.findAll({where: {postId: req.params.id}})
      .then(e => {
          res.status(200).json(e);
          console.log("ok ok ok ok ok ok ok")
      })
  }
    


