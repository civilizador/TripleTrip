// Separating db Schema for comments
var mongoose = require("mongoose");

//  adding author field as an object with 2 params id and username  to associate comment ("text" field) to user that pst it
var commentSchema = new mongoose.Schema({
    text: String,
    created: {type: Date, default: Date.now() },
    author: {
                id: {
                     type: mongoose.Schema.Types.ObjectId, //   id from the User model
                     ref: "User" // ref refers to the model that we are going to use here. Which is User.
                         },
        username: String
    }
});

 
module.exports = mongoose.model("Comment", commentSchema);