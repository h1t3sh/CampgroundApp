var express = require('express');
var app = express();

app.set("view engine", "ejs");


// ROUTES

// Homepage "/"
app.get("/", function (req, res){
	res.render("home");
});

// Camprounds
app.get("/campgrounds", function(req, res){
	// We start with Array for now, we'll connect a DB later
	var campgrounds = [
		{name: "Jane's Mountain", image="https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507441722673d79248c3_340.jpg"},
		{name: " The Solomen's den", image="https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf85254794e7c2778d1924b_340.jpg"},
		{name: "Canyon Bay", image="https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507441722673d79248c3_340.jpg"}
	]
	res.render("campgrounds",{campgrounds: campgrounds});
});







// Start Server port (3000)
app.listen(3000, function(){
	console.log("Campground Server listening on port 3000");
});

