var express = require('express');
var app = express();

app.set("view engine", "ejs");


// ROUTES

// Homepage "/"
app.get("/", function (req, res){
	res.render("home");
});












// Start Server port (3000)
app.listen(3000, function(){
	console.log("Campground Server listening on port 3000");
});

