   
   //   WHATEVER ROUTE IN THIS FILE YOU SHOULD attach /index to it to get actual route adddress.
   //   See app.js  app.use routes in the bottom of the code.
   
     const express     = require("express");
     const fetch       = require("node-fetch");
     const router      = express.Router();
     const Posts       = require("../models/campground");
     const Tags        = require("../models/tags");
     const middleware  = require("../middleware.js");
     const multer      = require('multer'); 
     const tempRegions = [{name: 'asia',
                              image: 'https://images.unsplash.com/photo-1506238539504-2aceb378161b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b796ab735d52c6bcf51c4ef647860fed&auto=format&fit=crop&w=1050&q=80'},
                         {name: 'europe' ,
                              image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=50b722a080aa7a9fd10746b95b82c2e7&auto=format&fit=crop&w=1050&q=80'},
                         { name: 'north-america',
                              image:'https://images.unsplash.com/photo-1518146721-32a72ca3a32c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c92acc7f29748c9c1ccdbc6efbf1e1a4&auto=format&fit=crop&w=1050&q=80'},
                         {name: 'south-america' ,
                              image: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f87ab668e404c342dc2943768cf3d2b3&auto=format&fit=crop&w=999&q=80'},
                         {name: 'australia' ,
                              image: 'https://images.unsplash.com/photo-1493375366763-3ed5e0e6d8ec?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0c4e66550a9b8c04ae4ab72c1bcf0829&auto=format&fit=crop&w=1081&q=80'},
                         ];
    const apiKey       = process.env.apiKey;
 
     
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
      
      
  //  INDEX ROUTE . 
     
     //INDEX - show all campgrounds
     router.get("/", function(req, res){
               let noMatch = null;
                    if(req.query.search) {
                         const regex = new RegExp(escapeRegex(req.query.search), 'gi');
                         Posts.find({'name':regex},function(err,allposts){  //here we pass all objects from DB to "allcamp" using callback function
                              if(err){ 
                                   console.log(err);
                              } else {
                                   if(allposts.length < 1) {
                                      noMatch = "No campgrounds match that query, please try again.";
                                   }
                                   res.render("camps/index",{allposts: allposts, currentUser: req.user,tempRegions: tempRegions, success: req.flash("success"), noMatch: noMatch});
                              }
                         }); 
                    }          
               else {
               
                // Get all campgrounds from DB
               Posts.find({}, function(err, allposts){
                if(err){
                    console.log(err);
                } else {
                     Tags.find({},function(err, alltags) {
                         if(err){ 
                              console.log(err);}
                              else{
                                   res.render("camps/index",{allposts: allposts, noMatch: noMatch, tempRegions: tempRegions, alltags:alltags});
                                        }
                     })
                }
             });
          }
          }
     );
 
       // FILTERING ROUTE
       
    router.get("/filter", function(req, res){
        
                Posts.find({}, function(err, allposts){
                    if(err){
                       console.log(err);
                    } else {
                        Tags.find({},function(err, alltags) {
                            if(err){ 
                                 console.log(err);}
                                 else{
                                      res.render("camps/filter",{
                                          allposts,
                                          allposts1: JSON.stringify(allposts), 
                                          tempRegions: tempRegions, 
                                          alltags:alltags});
                                           }
                        })
                    }
                });
    });
     
          // List all categories
     router.get("/categories", function(req,res){
          
          Posts.find({},function(err,allposts){  //here we pass all objects from DB to "allcamp" using callback function
               if(err){ console.log(err);} 
               else {
                    Tags.find({},function(err,allTags){
                         if(err){console.log("error"), console.log(err)}
                              else{
                                   let regions = [
                                        allTags[0].tags,
                                        allTags[1].tags,
                                        allTags[2].tags,
                                        allTags[3].tags,
                                        allTags[4].tags,
                                   ]
                                   res.render('camps/categories.ejs',{allTags:allTags,currentRegion:regions,allposts:allposts}) 
                              }        
                    });
               }
          });
     })
          // Create new categories
          
     router.post("/categories/create", function(req,res){
          let branchName = req.body.branchName;
          let tagsTemp   = req.body.tags;
          let tags       = tagsTemp.split(",");
          let newTag     = {
               branchName: branchName,
               tags: tags
          }
          Tags.create(newTag,function(err,newTag)
               {
               if(err){console.log("error"), console.log(err)}
                else{
                     console.log(newTag),
                     res.redirect('/index/categories') }        
          });
          
     })

    //  CREATE ROUTE
 
   //  Response to POST request to index.ejs page.
    router.post("/", middleware.isLoggedIn, function(req,res){
    //Grabbing data from input forms that we have on new.ejs page and create new entry in DB using .create method.
    let  name       = req.body.name;
    let  image      = req.body.image;
    let  desc       = req.body.desc; 
    let  price      = req.body.price;
    let  countryCode = req.body.countryCode;
    let  country    = req.body.country.toLowerCase();
    let  cities     = req.body.cities;
    let  places     = req.body.places;
    let  visitedLocationsNames = req.body.visitedLocationsNames;
    let  tips       = req.body.tips;
    let  tripLength = req.body.tripLength;
    let  avoid      = req.body.avoid;
    let  region     = req.body.region;
    let  subregion  = req.body.subregion;
    let  typeOfTrip = req.body.typeOfTrip;
    let  additional = req.body.additional;
    let  images     = req.body.images;
     
    let  author = {
          id: req.user._id,
          username: req.user.username
        };
        
    let newarray = {name:     name, 
                    image:    image,  
                    desc:     desc, 
                    price:    price,
                    images:   images,
                    country:  country,
                    countryCode: countryCode,
                    cities:   cities,
                    tips:     tips,
                    avoid:    avoid,
                    region:   region,
                    author:   author,
                    tripLength: tripLength,
                    visitedLocationsNames: visitedLocationsNames,
                    places:  places,
                    subregion: subregion,
                    typeOfTrip: typeOfTrip,
                    additional:additional,
                    likedByUsers: [],
     };

     console.log(req.user);
          Posts.create(newarray,function(err,newcamp)
               {
               if(err){console.log("error"), console.log(err)}
                else{res.redirect("/index");}        
          });
     });
     
     
    //  NEW ROUTE
        const additionalFields = ['transportation','money','secret-places','locals goes to','night-life']
        const typeOfTripArray = ['relaxing','hiking','mountains','history-rich','sea&beach','desert','futuristic','night-life']

    router.get("/new", middleware.isLoggedIn ,function(req,res)
    {
    res.render("camps/new.ejs",{currentUser:req.user,typeOfTripArray:typeOfTripArray,additionalFields:additionalFields,apiKey:apiKey});
    });

     
    //  SHOW ROUTE 
    // always should be after index/new route, otherwise will treat to  "new" route as show route where id="new".
    let objLatLng = [];
    let nameArray = [];
    let responsesArray = [];
    const apiRoute = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';

    router.get("/:id" , function(req, res)
    {
          //    find the camp with id of the camp entry and using .populate and .exec we are populating actual comments instead of reference id's.
        Posts.findById(req.params.id).populate("comments").exec(function(err,postById)
      {
         if(err) {console.log("Something wrong"), console.log(err);}
         else {//render SHOW route with that particular camp.
                console.log(postById); 
                let allLatLngPlaces = postById.places;
                let allLatLngPlaces1 = allLatLngPlaces.split('*');
                    for(let i=0;i< allLatLngPlaces1.length;i++) { 
                        nameArray.push(allLatLngPlaces1[i].split("_")) 
                    }  
                    for(let i=0;i< nameArray.length;i++) {  
                                objLatLng.push({lat: nameArray[i][1], lng: nameArray[i][2] })  
                                // РАБОТАЕТ
                                  console.log(objLatLng[i].lat) 
                                // РАБОТАЕТ
                                  console.log(objLatLng[i].lng)  
                     }  
                        async function searchNearbyPlace() {
                              let  lat = objLatLng[0].lat;
                              let  lng = objLatLng[0].lng;
                              const response = await fetch( `${apiRoute}${lat},${lng}&rankby=distance&type=museum&keyword=museum&key=${apiKey}`)
                              return (await response.json()).results 
                         }     
                            let places1=searchNearbyPlace();           
                            console.log(places1)    
                    
                    res.render("camps/show",{posts: postById, currentUser : req.user, tags: Tags,objLatLng:objLatLng, responsesArray: places1 ,apiKey:apiKey  });}
      });
      req.params.id;
     });
     
     
    //  IMAGE UPLOAD ROUTE
        router.post('/:id/upload',multer(multerConfig).array('photos',5),function(req,res){
            
            console.log('Photo upload Complete!');
             
            let path1=[]; 
            for(let i=0;i<req.files.length;i++)
            path1.push(".."+req.files[i].path.substring(6,req.files[i].length));
             
            console.log("File is uploaded url : " + path1);
            Posts.findByIdAndUpdate(req.params.id,  { images: path1}, 
                function(err, foundPost){
                    if(err){throw err} else{
                         res.redirect("/index/"+req.params.id);
                    }
                } 
            )    
     });
     
     // SHOW PAGE by Country NAME only 
     
     router.get("/showCountry/:id" , function(req, res)
     {
          Posts.find({country:req.params.id}, function(err,allMatched) {
             if(err){throw err}
             else{
                 res.render("camps/showAllByCountry",{postsByCountryName:allMatched})
             }
        })
     });
     
      // SHOW PAGE by Region NAME only 
     
     router.get("/showByRegion/:id" , function(req, res)
     {
          Posts.find({region:req.params.id}, function(err,allMatched) {
             if(err){throw err}
             else{res.render("camps/showByRegion",{allposts:allMatched,region:req.params.id})}
        })
     });


    //  EDIT ROUTE
     
    router.get("/:id/edit", middleware.checkOwnership, function(req, res)
    {   Posts.findById(req.params.id, function(err, foundPost)
        {  if (err) {throw err}
            res.render("camps/edit", {foundPost: foundPost});                 
        }); 
    });
    
    
    
     //  LIKE - UNLIKE route
    
     router.post("/:id/act",async function(req, res) {
          const userId = req.user._id
          const { action } = req.body
          const post = await Posts.findById(req.params.id)
          // ----------^^^^^ тут не хватало авейта
          const hasLiked = post.likedByUsers.indexOf(userId) !== -1

          if (action === 'Like' && !hasLiked) {
               post.likedByUsers.push(userId)
          }
          else if (action === 'Unlike' && hasLiked) {
               post.likedByUsers = post.likedByUsers.filter((id) => (`${userId}` !== `${id}`))
          }
          await post.save()
          res.send({
               likesCount: post.likedByUsers.length,
          })
     });
     
    //  //  Check route
    // router.get("/:id/checkUser",function(req,res){
    //     let userId=req.user._id
        
    // })
    
    
    
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