const Post = require('../models/post');
const fs = require('fs');


exports.createPost = (req, res, next) => {
  // Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data, et non sous forme de JSON


  const post = new Post({
    description: req.body.post,
    // pour likes et dislikes on leur met une valeur par defaut 
    likes: 0,
    dislikes: 0,
    usersDisliked: [],
    usersLiked: [],

    // on récupère l'id qui a été créé précédemment dans le middleware
    userId: req.auth.userId,
    email: req.auth.email,
  
    
  });

  // req.protocole --> segment http de l'url de l'image
  // req.get('host') --> segment pour ajouter l'hôte du server à l'url de l'image
  if (req.file != undefined){ 
    post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  // save renvoie une promesse
  post.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      console.log(error)
      res.status(400).json({
        error: error
      });
    }
  );
};
  
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id
  }).then(
    (post) => {
      console.log(post);
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

  
  exports.deletePost = (req, res, next) => {
    // on récupére le post dans la bdd, puis on vérife qu'elle appartient à l'utilisateur
    // si oui, on la supprime   
    // sinon, on retourne une erreur 
    Post.findOne({ _id: req.params.id }).then(
      (post) => {
        
        // !post : veut dire que le post n'existe pas 
        if (!post) {
          res.status(404).json({
            error: new Error("Le post n'existe pas!")
          });
        }
        if (post.userId !== req.auth.userId && !req.auth.isAdmin) {
          res.status(403).json({
            error: new Error('Unauthorized request!')
          });
          return 
        }
        
        if (post.imageUrl != undefined){
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, (err) => {
            console.log(err)
            Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
          });
        }
        else{
           Post.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
              .catch(error => res.status(400).json({ error }));
        }
        
    })
    .catch(error => {
      console.log(error),
      res.status(500).json({ error })
    });
};
   

  
  exports.modifyPost = (req, res, next) => {
    // on récupere le post correspondant à req.params.id
    Post.findOne({ _id: req.params.id }).then(post =>{
      // le post existe
      if (post.userId === req.auth.userId || req.auth.isAdmin){
        // la personne qui appelle cette action est soit le propriétaire soit l'admin
        Post.updateOne({ _id: req.params.id }, { 
          description: req.body.description
        })
        .then(() => 
          res.status(200).json({ message: 'Objet modifié !'})
        )
        .catch(error => {
          res.status(400).json(error)
        });
      }
      else {
        res.status(403).json({ message: "non authorisé"})
      }



    }).catch( () => res.status(404).json({erreur: "ce post n'existe pas"}))





  };


  exports.getAllPost = (req, res, next) => {
      // find renvoie une promesse
    Post.find().then(
      (post) => {
        res.status(200).json(post);
      }
    ).catch(
      (error) => {
        console.log(error)
        res.status(400).json({
          error: error
        });
      }
    );
  };


  exports.likeOrDislike = (req, res, next) => {
    // mettre en place la possibilité pour l'utilisateur de mettre un like ou un dislike sur un post
    // si l'utilisateur clique sur like, ajoute +1 au nb de like et idem pour dislike
    // a chaque click sur like/dislike, l'id de l'utilisateur qui a donné son avis est stocké dans un tableau
    // si utilisateur reclick, son id sera supprimé du tableau 
    // l'utilisateur ne peut mettre qu'une seule valeur pour chaque post 
    // mise à jour du total like et dislike à chaque click sur l'îcone 

    // d'abord il faut récupérer le post 
    // récuperer id user 

    Post.findOne({ _id: req.params.id }).then(
      (s) => {
        let nblike = req.body.like
        removeVote(s, req.auth.userId)
        if (nblike === 1){

          like(s, req.auth.userId);
        }
        else if(nblike === -1 ){

          dislike(s, req.auth.userId);
        }
        else {
          removeVote(s, req.auth.userId)
        }
        
        // .save permet de mettre à jour le post 
        s.save().then((post) => 
          res.status(200).json(post)
        )
        .catch(error => { 
          console.log(error);
          res.status(500).json({ error })
        })
      }).catch(error => {
        console.log(error)
        res.status(404).json({
          error: error
        });
      })
  };


  // fonction permettant d'ajouter l'id de l'utilisateur et d'incrémenter le nombre de likes
  function like(post, idUserWhoVoted){
    let i = post.usersLiked.findIndex((e)=> e === idUserWhoVoted)
    if(i === -1){
      post.usersLiked.push(idUserWhoVoted)
      post.likes = post.likes + 1
    }
  }


  // fonction permettant d'ajouter l'id de l'utilisateur et d'incrémenter le nombre de dislikes
  function dislike(post, idUserWhoVoted){
    let i = post.usersDisliked.findIndex((e)=> e === idUserWhoVoted)
    if(i === -1){
      post.usersDisliked.push(idUserWhoVoted)
      post.dislikes = post.dislikes + 1
    }
        
  }
  
  // fonction permettant de d'enlever l'id de l'utilisateur dès qu'il retire son vote, et de décrémenter like ou dislike
  function removeVote(post, idUserWhoVoted){
    let i = post.usersLiked.findIndex((e)=> e === idUserWhoVoted)
    if(i != -1){
      post.usersLiked.splice(i, 1 )
      post.likes = post.likes - 1
    }

    i = post.usersDisliked.findIndex((e)=> e === idUserWhoVoted)
    if(i != -1){
      post.usersDisliked.splice(i, 1 )
      post.dislikes = post.dislikes - 1
    }
    
  }