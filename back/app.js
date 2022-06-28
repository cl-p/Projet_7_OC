const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./router/route_user');
const postRoutes = require('./router/route_post')
const Post = require('./models/post');
const path = require('path');
app.use(express.json());





app.use('/images', express.static(path.join(__dirname, 'images')))

mongoose.connect('mongodb+srv://clementine:Chouquette21@testcoursoc.4dqoggy.mongodb.net/?retryWrites=true&w=majority', 
{ useNewUrlParser: true,
  useUnifiedTopology: true 
}).then( () => {
  console.log("Tout est bon")
}).catch( (err) => {
  console.log(err)
} )


// IL FAUDRA LES MODIFIER !!!!



// Ci-dessous, le code pour les CORS
// ces headers permettent d'accéder à notre API depuis n'importe quelle origine 
// ils permettent aussi d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
// et aussi de d'envoyer des requêtes avec les méthodes mentionnées 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });





app.use('/api/sauces', postRoutes)
app.use('/api/auth', userRoutes )




 module.exports = app;