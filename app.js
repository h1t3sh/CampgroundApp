// Campground App

var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require('method-override'),
    Campground  = require('./models/campground'),
    User        = require('./models/user'),
    Comment     = require('./models/comment'),
    seedDB      = require('./seeds');

// requiring routes
var campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index');  // Auth routes

//seedDB();
mongoose.connect("mongodb://localhost:27017/camp_app", { useNewUrlParser: true , useUnifiedTopology: true });   // Connect to camp_app DB, create if it doesn't exist yet
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));     // tell express to server public dir, __dirname expands current dir path
app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: "The world still spins round nd round",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware that will run for every route
app.use(function(req, res, next){     // req.user is undefined if no user is logged in
    res.locals.currentUser = req.user;  //req.user provided by passport and setting it to res.locals make it available to all routes
    next();
});

// tells our app to use 3 files that we have required in line 15
app.use("/", indexRoutes);  // just for consistency, auth routes start with /
app.use("/campgrounds", campgroundRoutes); // prepend /campground in front of campground routes (shortens code there)
app.use("/campgrounds/:id/comments", commentRoutes);


// Start Server port (3000)
app.listen(3000, function(){
	console.log("Campground Server listening on port 3000");
});

