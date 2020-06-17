// Campground App

// different style 
var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    LocalStrategy   = require('passport-local'),
    Campground  = require('./models/campground'),
    User        = require('./models/user'),
    Comment     = require('./models/comment'),
    seedDB      = require('./seeds')

//seedDB();
mongoose.connect("mongodb://localhost:27017/camp_app", { useNewUrlParser: true , useUnifiedTopology: true });   // Connect to camp_app DB, create if it doesn't exist yet
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));     // tell express to server public dir, __dirname expands current dir path

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


// ROUTES

// Homepage "/"
app.get("/", function (req, res){
	res.render("home");
});

// INDEX - Show all Camprounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    });
});

// CREATE - Add new Campground to DB
app.post("/campgrounds", function(req, res){
    // We get the form data
    var name =  req.body.name;
    var image = req.body.image;
    var desc = req.body.description;    // name attribute in input form
    var newCampground = {name: name, image: image, description: desc};  // Add three items mentioned in schema and submitted by new form
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            // If no error, We redirect to /campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// NEW - Show Form to create new Campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - Shows more info about one Campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
//            console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});

// ============================
// COMMENTS ROUTES
// ============================
app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            // create a new comment
//            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err)
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })

        }
    })
    // connect new comment to campground
    // redirect campground to show page
});

//==============
// auth routes
//==============

// show register form
app.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user){      //from passport plugin
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});


// show login form
app.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
// app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local",   //middleware
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),function(req, res){  //callback doesn't do anyting here
});



















// Start Server port (3000)
app.listen(3000, function(){
	console.log("Campground Server listening on port 3000");
});

