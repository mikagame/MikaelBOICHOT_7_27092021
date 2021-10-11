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
    const POST = ({
        userId: req.body.id,
        post: req.body.post,
        imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`      //${req.body.imgUrl} ${req.file.filename}
    }) 
    db.Wall.create(POST)
    .then(res => res.status(201).json(POST))
    .catch(err => (res.status(500).json({message: err.message})))
    }

    exports.deletePost = (req, res, next) => {

        console.log(req.body)
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



  
    


