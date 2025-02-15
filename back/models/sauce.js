const mongoose = require('mongoose');

const SauceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper : {type : String, required : true},
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    userId: { type: String, required: true },
    likes : {type : Number, required : true, default : 0},
    dislikes: {type : Number, required : true, default : 0},
    usersLiked : {type: Array, required : true},
    usersDisliked : {type : Array, required : true}


});


module.exports = mongoose.model('Sauce', SauceSchema);


