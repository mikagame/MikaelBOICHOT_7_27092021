const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');


router.post('/', userCtrl.createComment);
router.get('/',  userCtrl.getAll);



module.exports = router;