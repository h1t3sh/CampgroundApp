// Campground App

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// We start with Array for now, we'll connect a DB later
var campgrounds = [
	{name: "Jane's Mountain", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417d2d7fdd964fc7_340.jpg"},
	{name: " The Solomen's den", image:"https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547941772b72d5954f_340.jpg"},
	{name: "Canyon Bay", image:"https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
	{name: " The Solomen's den", image:"https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547941772b72d5954f_340.jpg"},
	{name: "Canyon Bay", image:"https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
	{name: "Canyon Bay", image:"https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
	{name: "Jane's Mountain", image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074417d2d7fdd964fc7_340.jpg"},
	{name: " The Solomen's den", image:"https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547941772b72d5954f_340.jpg"},
	{name: "Canyon Bay", image:"https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e5074417d2d7fdd914cc2_340.jpg"}
];

// ROUTES

// Homepage "/"
app.get("/", function (req, res){
	res.render("home");
});

// Camprounds
app.get("/campgrounds", function(req, res){
	res.render("campgrounds",{campgrounds: campgrounds});
});

// POST to campgrounds
app.post("/campgrounds", function(req, res){
    // We get the form data
    var name =  req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //console.log(campgrounds);
    // We redirect to /campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});





// Start Server port (3000)
app.listen(3000, function(){
	console.log("Campground Server listening on port 3000");
});

