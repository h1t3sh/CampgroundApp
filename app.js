// Campground App

// different style 
var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require('./models/campground');

mongoose.connect("mongodb://localhost:27017/camp_app", { useNewUrlParser: true , useUnifiedTopology: true });   // Connect to camp_app DB, create if it doesn't exist yet
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


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
            res.render("index",{campgrounds: allCampgrounds});
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
    res.render("new");
});

// SHOW - Shows more info about one Campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            // render show template with that campground
            res.render("show",{campground: foundCampground});
        }
    });
});



// Start Server port (3000)
app.listen(3000, function(){
	console.log("Campground Server listening on port 3000");
});

