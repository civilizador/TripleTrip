var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    first: String,
    last: String,
    username: String,
    password: String,
    avatar: String,
    email: String,
    homeCountry:String,
    homeCity:String,
    countryCode: String,
    numOfPosts: {Number,default:0},
    rating: {Number,default:0},
    citiesVisited: {
      type: Array,
      'default': []
    },
    countriesVisited: {
      type: Array,
      'default': []
    },
    comboTrips: {title: String,
                 countries: Array
                 },
    isAdmin : {type:Boolean, default: false}
});
//  adds additional methods from passportLocalMongoose to our User Schema.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);