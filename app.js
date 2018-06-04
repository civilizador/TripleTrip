 
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Post   = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    methodOverride = require("method-override"),
    seedDB      = require("./seeds"),
    flash       = require("connect-flash");

//  requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
    
    
    //  Connecting to DB yelpcamp
    mongoose.connect("mongodb://localhost/finalProject");
    //  Moment.js config
     app.locals.moment = require("moment");
    
         //  Passport configuration
        
    app.use(require("express-session")({
        secret: "when travel is in your dna",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));
    //  using method ovverride to be able to make put request
    app.use(methodOverride("_method")); 
    //  flash messages about errors or successfull login/register etc. SHOULD ALWAYS BE AFTER PASSPORT config
    app.use(flash());    
    
     //   Creating a function that will check if there is a username/i.e is user loged in or not.
    app.use(function(req, res, next){
    res.locals.currentUser = req.user;// req.user will either be empty or contain information about user from the request
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();  }); 
    
    //  shorting down route length by defining prefixes for coment campground and auth routes.                
    app.use("/", indexRoutes);
    app.use("/index", campgroundRoutes);
    app.use("/index/:id/comments",commentRoutes);

    app.listen(process.env.PORT,process.env.IP,function(){console.log("Server had been started")});