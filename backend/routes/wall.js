const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/wall');
const auth = require('../middleware/auth');

router.post('/', auth, userCtrl.createComment);
router.get('/', auth, userCtrl.getAll);


module.exports = router;