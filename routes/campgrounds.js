
var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");

// INDEX - Show all Camprounds
router.get("/", function(req, res){
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
router.post("/", function(req, res){
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
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - Shows more info about one Campground
router.get("/:id", function(req, res){
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

module.exports = router;
