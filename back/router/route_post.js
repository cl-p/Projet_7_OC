const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config')

// localhost:3001/api/post
// le routeur ne vérifie que ce qui vient après /api/post
router.get('/', postCtrl.getAllPost);
router.post('/', multer ,postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);
router.post('/:id/like', postCtrl.likeOrDislike);


// router.get('/', auth ,postCtrl.getAllPost);
// router.post('/', auth ,multer ,postCtrl.createPost);
// router.get('/:id', auth ,postCtrl.getOnePost);
// router.put('/:id', auth, multer, postCtrl.modifyPost);
// router.delete('/:id', auth ,postCtrl.deletePost);
// router.post('/:id/like', auth, postCtrl.likeOrDislike);



module.exports = router;