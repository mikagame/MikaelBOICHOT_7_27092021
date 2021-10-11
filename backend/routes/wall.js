const express = require('express');
const router = express.Router();
const wallCtrl = require('../controllers/wall');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, wallCtrl.createPost);
router.get('/', auth, multer,  wallCtrl.getAll);
router.get('/:id',auth, multer, wallCtrl.getOne);
router.delete('/:id', auth, wallCtrl.deletePost);
router.get('/assoc/:id',auth, multer, wallCtrl.assoc);

module.exports = router;