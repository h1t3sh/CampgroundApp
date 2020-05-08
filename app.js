// Campground App

// different style 
var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost:27017/camp_app", { useNewUrlParser: true , useUnifiedTopology: true });   // Connect to camp_app DB, create if it doesn't exist yet
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// Make a model from Schema, so that we can use useful methods
var Campground = mongoose.model("Campground", campgroundSchema);

// Temporary Code
//Campground.create(
//    {
//        name: "Canyon Bay", 
//        image:"https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//        description: "A Beautiful Bay with an Awesome sunset View."
//    }, function(err,campground){
//        if(err){
//            console.log(err);
//        }else{
//            console.log("Newly Created Campground");
//            console.log(campground)
//        }
//    });


// We start with Array for now, we'll connect a DB later
//var campgrounds = [
//	{name: "Jane's Mountain", image:"https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"},
//	{name: "Canyon Bay", image:"https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
//	{name: " The Solomen's den", image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//	{name: "Jane's Mountain", image:"https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"},
//	{name: "Canyon Bay", image:"https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
//	{name: "Canyon Bay", image:"https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
//	{name: "Jane's Mountain", image:"https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"},
//	{name: " The Solomen's den", image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//	{name: "Canyon Bay", image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
//];

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

