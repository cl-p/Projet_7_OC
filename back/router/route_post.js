const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config')

// localhost:3001/api/post
// le routeur ne vérifie que ce qui vient après /api/post

router.get('/', auth ,postCtrl.getAllPost);
router.post('/', auth ,multer ,postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth ,postCtrl.deletePost);
/* 
ce qu'elle attend ce qu'elle attend de la part du front : 
- la requête attend du json ressemblant à : (x étant 1 ou -1 ou 0)
{
    "like": "x"
}
1 : veut dire qu'on ajoute 1 like
-1 : on ajoute un dislike
0 : il y a eu une annulation (l'un ou l'autre)

elle renvoie : code 200 avec json "objet modifié" ou un code 500 si elle plante ou 404 si le poste avec l'id passé n'existe pas
*/
router.post('/:id/like', auth, postCtrl.likeOrDislike);



module.exports = router;