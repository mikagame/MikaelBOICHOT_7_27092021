const express = require('express');
const router = express.Router();
const wallCtrl = require('../controllers/wall');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/',  wallCtrl.createPost);
router.get('/', auth, wallCtrl.getAll);
router.get('/:id', wallCtrl.getOne);


module.exports = router;