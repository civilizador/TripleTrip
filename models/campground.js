 var mongoose =      require("mongoose");


var  Posts = new mongoose.Schema
({   name: String,
     image: String,
     desc: String,
     price: String,
     group: String,
     cities: Array,
     country: String,
     tips: String,
     avoid: String,
     transp: String,
     
     created: {type: Date, default: Date.now() },
     author: {
     id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
     },
     username: String
     },
     comments: // adding comments field into schema
     [ { type: mongoose.Schema.Types.ObjectId,  // setting type of data as Oject id.
     ref: "Comment"} ] //   this part will be imported from comment Schema because of this line:
                //   module.exports = mongoose.model("Comment", commentSchema);
     } );
     
     module.exports = mongoose.model("camps",Posts);// here we take a Schema and compile it into the model.
                                                //It will create collection named "camps" in the yelpcamp database