const express     = require("express");
const router      = express.Router();
const passport    = require("passport");       
const User        = require("../models/user");
const Posts       = require("../models/campground");
const bodyParser  = require('body-parser');
const multer      = require('multer'); 
const fetch = require("node-fetch");
let countryCodesArray = [];
const apiRoute11 = "https://restcountries.eu/rest/v2/alpha/";

async function getAllCountriesInfo (country) {
  console.log("Visited COUNTRY: " + country)
  countryCodesArray.push(country)
  const response = await fetch( `${apiRoute11}`+`${country}`)
  const json = await response.json()
  return json
}

 //MULTER CONFIG: to get file photos to temp server storage
 const multerConfig = {

  storage: multer.diskStorage({
 //Setup where the user's file will go
 destination: function(req, file, next){
   next(null, './public/storage');
 },   

    //Then give the file a unique name
    filename: function(req, file, next){
      console.log(file);
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.'+ext);
    }
  }),   

    //A means of ensuring only images are uploaded. 
    fileFilter: function(req, file, next){
      if(!file){
        next();
      }
      const image = file.mimetype.startsWith('image/');
      if(image){
        console.log('photo uploaded');
        next(null, true);
      }else{
        console.log("file not supported");

          //TODO:  A better message response to user on failure.
          return next();
        }
      }
    };


//  const { geocode, searchNearbyPlace } = require('./googleApi.js')


     // root route "/" with rendering of landing.ejs
     router.get("/",function (req,res) {
       res.render("landing"); 
     });
     
     router.post('/user/:id/upload',multer(multerConfig).single('photo'),function(req,res){
       console.log('Photo upload Complete!');
       var path = ".."+req.file.path.substring(6,req.file.path.length);

       console.log("File is uploaded url : " + path);
       User.findByIdAndUpdate(req.params.id,{ avatar: path }, 
        function(err, foundUser){
          if(err){throw err} else{
            res.redirect("/user/" + req.params.id);
          }
        } 
        )    
     });
     
     // game route
     
     let countNames = [] ;
     let countCapitals = [] ;
     let countPopulation = [] ;
     let countCurrency = [];
     let countRegion = [];
     let countBorders = [];
     let countsubRegion = [];
     let countLang = [];
     let countNames2 = [] ;
     
     router.get("/user/:id/game", async function (req,res){
            try {
             const foundUser = await User.findById(req.params.id)
             const visitedCountries = foundUser.countriesVisited[0].substring(2,foundUser.countriesVisited[0].length-2).split('","')
             const countriesInfo = await Promise.all(visitedCountries.map(getAllCountriesInfo))
                    countNames = [] ;
                    countriesInfo.forEach(function(countryInfoDetails) {
                    countNames.push( [countryInfoDetails.name] );
                    countCapitals.push( [countryInfoDetails.capital] );
                    countPopulation.push( [countryInfoDetails.population] );
                    countRegion.push([countryInfoDetails.region]);
                    countBorders.push(countryInfoDetails.borders[0]+" "+ countryInfoDetails.borders[1]+" "+ countryInfoDetails.borders[2]);
                    countsubRegion.push([countryInfoDetails.subregion]);
                    let countCurrencyTemp = countryInfoDetails.currencies[0].name.split(' ')[1];
                    countLang.push( [countryInfoDetails.languages[0].name] );
                    countCurrency.push(countCurrencyTemp);
                    
                        console.log("Playing Capitals" + countCapitals)
                        console.log("Playing Population" + countPopulation)
               } )
             const posts = await Posts.find().where('author.id').equals(foundUser._id).exec()
             res.render("users/game1", { 
               foundUser, 
               foundPosts:posts,
               currentUser:req.user,
               countriesInfo,
               countryCodesArray:countryCodesArray,
               visitedCountries:JSON.stringify(visitedCountries),
               countNames,
               countNames1: JSON.stringify(countNames),
               countCapitals,
               countCapitals1: JSON.stringify(countCapitals),
               countPopulation,
               countPopulation1: JSON.stringify(countPopulation),
               countCurrency,
               countCurrency1: JSON.stringify(countCurrency),
               countLang,
               countLang1: JSON.stringify(countLang),
               countRegion,
               countRegion1: JSON.stringify(countRegion),
               countsubRegion,
               countsubRegion1:JSON.stringify(countsubRegion),
               countBorders,
               countBorders1:JSON.stringify(countBorders),
              });    
           }
           catch (e) {
             console.log(e)
             req.flash("error","something is wrong")
             res.redirect("/")
           }
     })

     //   Show REGISTER form page
     
     router.get("/register",function(req, res) {
      res.render("register",{currentUser:req.user});
    });

     //   handle REGISTER logic
     
     router.post("/register", function(req, res){

      var newUser = new User({
       username: req.body.username,
       first:    req.body.first,
       last:     req.body.last,
       email:    req.body.email,
       avatar:   req.body.avatar,
       facebookURL:   req.body.facebookURL,
       twitterURL:    req.body.twitterURL,
       homeCountry:   req.body.homeCountry,
       countriesVisited: req.body.countriesVisited,
       countryCode:      req.body.countryCode
     });
               //    eval (require("locus"))
               User.register(newUser, req.body.password, function(err, user){
                 if(err){
                  req.flash("error: "+err,"something is wrong");
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

     // USER SHOW ROUTE 
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
    }
    );
     
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
               if(err){req.flash("error","something is wrong");
                    res.redirect("/index")  
               } else {
                     //redirect somewhere(show page)
                     res.redirect("/user/" + req.params.id);
                   }
          });
     });
     
     
 module.exports = router
 