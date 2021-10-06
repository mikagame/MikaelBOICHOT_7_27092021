const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/wall');
const auth = require('../middleware/auth');

router.post('/', userCtrl.createPost);

router.get('/', auth, userCtrl.getAll);
router.get('/:id', userCtrl.getOne);


module.exports = router;