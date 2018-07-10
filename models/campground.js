var  mongoose  = require("mongoose");
var  Posts     = new mongoose.Schema
({   name:          String,
     region:        String,
     subregion:     String,
     cities:        Array,
     places:        String,
     country:       String,
     countryCode:   String,
     visitedLocationsNames: Array,
     placesNamesOnly: Array,
     image:         String,
     images:        Array,
     desc:          String,
     tripLength:    Number,     
     price:         String,
     group:         String,
     tips:          String, 
     wasLikedBy :   Number,
     avoid:         String,
     transp:        String,
     typeOfTrip:    String,
     likedByUsers:  Array,
     categories:    Array,
     additional:    Array,
     created: {type: Date, default: Date.now() },
     author: {
          id: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User"
          },
          username: String
     },
     comments: // adding comments field into schema
     [ { 
          type: mongoose.Schema.Types.ObjectId,  // setting type of data as Oject id.
               ref: "Comment"} ] //   this part will be imported from comment Schema because of this line:
                //   module.exports = mongoose.model("Comment", commentSchema);
     } );
     
     module.exports = mongoose.model("camps",Posts);// here we take a Schema and compile it into the model.
                                                //It will create collection named "camps" in the yelpcamp database