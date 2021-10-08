const express = require('express');
const router = express.Router();
const wallCtrl = require('../controllers/wall');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, wallCtrl.createPost);
router.get('/', auth, multer,  wallCtrl.getAll);
router.get('/:id', wallCtrl.getOne);


module.exports = router;