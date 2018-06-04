   
   //   WHATEVER ROUTE IN THIS FILE YOU SHOULD attach /index to it to get actual route adddress.
   //   See app.js  app.use routes in the bottom of the code.
   
     const express     = require("express");
     const router      = express.Router();
     const Posts   = require("../models/campground");
     const middleware  = require("../middleware.js");
     
  //  INDEX ROUTE . 
   
     //INDEX - show all campgrounds
     router.get("/", function(req, res){
          let noMatch = null;
          if(req.query.search) {
          const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
          Posts.find({},function(err,allcamp){  //here we pass all objects from DB to "allcamp" using callback function
          if(err){ console.log(err);} 
          else {
               if(allcamp.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";
               }
               res.render("camps/index",{camps: allcamp, currentUser:req.user, success: req.flash("success"), noMatch: noMatch});
                    }
          });
          } else {
           // Get all campgrounds from DB
          Posts.find({}, function(err, allcamp){
           if(err){
               console.log(err);
           } else {
              res.render("camps/index",{camps: allcamp, noMatch: noMatch});
           }
        });
    }
});


    //  CREATE ROUTE
 
   //  Response to POST request to index.ejs page.
    router.post("/", middleware.isLoggedIn, function(req,res)
    //Grabbing data from input forms that we have on new.ejs page and create new entry in DB using .create method.
 {  let  name = req.body.name;
    let  image = req.body.image;
    let  desc = req.body.desc; 
    let  price = req.body.price;
    let  country = req.body.country;
    let  cities = req.body.cities;
    let  tips = req.body.tips;
    let  avoid = req.body.avoid;
    let  author = {
          id: req.user._id,
          username: req.user.username
    };
    let newarray = {name: name, 
                    image: image,  
                    esc: desc, 
                    author: author, 
                    price: price,
                    country: country,
                    cities: cities,
                    tips:     tips,
                    avoid:    avoid
    };

        console.log(req.user);
        Posts.create(newarray,function(err,newcamp)
        {
            if(err){console.log("error"), console.log(err)}
                else{res.redirect("/index");}        
        });
  });

    //  NEW ROUTE
    
    router.get("/new", middleware.isLoggedIn ,function(req,res)
    {
    res.render("camps/new.ejs",{currentUser:req.user});
    });

    //  SHOW ROUTE 
    
    // always should be after index/new route, otherwise will treat to  "new" route as show route where id="new".
      
    router.get("/:id" , function(req, res)
    {
          //    find the camp with id of the camp entry and using .populate and .exec we are populating actual comments instead of reference id's.
        Posts.findById(req.params.id).populate("comments").exec(function(err,campById)
      {
         if(err) {console.log("Something wrong"), console.log(err);}
         else {//render SHOW route with that particular camp.
         console.log(campById); 
        res.render("camps/show",{campDesc: campById, currentUser : req.user });}
      });
      req.params.id;
});


    //  EDIT ROUTE
     
    router.get("/:id/edit", middleware.checkOwnership, function(req, res)
    {   Posts.findById(req.params.id, function(err, foundPost)
        {  if (err) {throw err}
            res.render("camps/edit", {foundPost: foundPost});                 
        }); 
    });

    //  UPDATE ROUTE
    
    router.put("/:id",middleware.checkOwnership, function(req, res){
    // find and update the correct campground
    Posts.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){throw err} else 
       {
           //redirect somewhere(show page)
           res.redirect("/index/" + req.params.id);
       }
         });
    });
    
    //  DELETE ROUTE        
    
    router.delete("/:id",middleware.checkOwnership, function(req, res)
    { Posts.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/index");
    } else {
      res.redirect("/index");
            }
        });
    });
 

 
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

               
module.exports=router;