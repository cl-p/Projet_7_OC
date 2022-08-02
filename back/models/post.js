const mongoose = require('mongoose');


const post = mongoose.Schema({
    userId: { type: String, required: true},
    email: { type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: false},
    likes: {type: Number, required: true},
    dislikes: { type: Number, required: true},
    usersDisliked: {type: Array, required: true},
    usersLiked: {type: Array, required: true}
}
)

module.exports = mongoose.model('post', post);