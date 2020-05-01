// Campground App

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// We start with Array for now, we'll connect a DB later
var campgrounds = [
	{name: "Jane's Mountain", image:"https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"},
	{name: "Canyon Bay", image:"https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
	{name: " The Solomen's den", image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
	{name: "Jane's Mountain", image:"https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"},
	{name: "Canyon Bay", image:"https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
	{name: "Canyon Bay", image:"https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
	{name: "Jane's Mountain", image:"https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"},
	{name: " The Solomen's den", image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
	{name: "Canyon Bay", image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
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

