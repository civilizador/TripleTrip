 const express     = require("express");
 const router      = express.Router();
 const passport    = require("passport");       
 const User        = require("../models/user");
 const Posts       = require("../models/campground");

     // root route "/" with rendering of landing.ejs
     router.get("/",function (req,res) {
     res.render("landing"); 
     });
               
     //   Show REGISTER form page
     router.get("/register",function(req, res) {
          res.render("register",{currentUser:req.user});
     });
   
     //   handle sign up logic
     router.post("/register", function(req, res){
           
          var newUser = new User({
               username: req.body.username,
               first:    req.body.first,
               last:     req.body.last,
               email:    req.body.email,
               avatar:   req.body.avatar,
               homeCity: req.body.homeCity,
               homeCountry: req.body.homeCountry,
               countriesVisited: req.body.countriesVisited,
               citiesVisited:    req.body.citiesVisited,
               countryCode:        req.body.countryCode,
          });
               //    eval (require("locus"))
          User.register(newUser, req.body.password, function(err, user){
               if(err){
                req.flash("error", err.message);
                    return res.render("register");
                    }
                    passport.authenticate("local")(req, res, function(){
                    req.flash("success", "nice to see you again " + user.username.toUpperCase());
                    res.redirect("/index"); 
               });
          });
     });

    //  show login form
     router.get("/login",function(req, res) {
          res.render("login",{currentUser:req.user});
     });
    
     // handling login logic
     router.post("/login", passport.authenticate("local", {
        successRedirect: "/index", //build in methods that authenticate user.
        failureRedirect: "/login"
        }), function(req, res){
     });
    
     // logout route
     router.get("/logout", function(req, res){
        req.logout();
        res.redirect("/login");
     });
    
            //  this function will check if user is loged in and if it does it will run "next()" which is any function that is suppose to be called
        //  for that route. We just put isLoggedIn on wherever page we want to check if user is loged in.
         
     // USER ROUTE 
     router.get("/user/:id", function(req, res){
          User.findById(req.params.id, function(err, foundUser) {
               if(err) {req.flash("error","something is wrong")
                   res.redirect("/")
               }
               else {
                    Posts.find().where('author.id').equals(foundUser._id).exec(function(err,posts){
                          if(err) {req.flash("error","something is wrong")}
                          res.render("./users/show",{foundUser:foundUser,foundPosts:posts,currentUser:req.user});  
                    })  
               } 
          })
     });
     
     // USER Edit FORM
     router.get("/user/:id/edit", function(req, res){
          User.findById(req.params.id, function(err, foundUser) {
               if(err) {req.flash("error","something is wrong")
                  res.redirect("/")
               }
               else {
                    res.render("./users/edit",{foundUser:foundUser});  
               } 
          })
     });
     
     router.put("/user/:id", function(req, res){
     // find and update the correct campground
     User.findByIdAndUpdate(req.params.id, req.body.userDet, function(err, foundUser){
       if(err){throw err} else 
       {
           //redirect somewhere(show page)
           res.redirect("/user/" + req.params.id);
       }
         });
    });
    
          
     module.exports = router;