
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
router.post("/", isLoggedIn, function(req, res){
    // We get the form data
    var name =  req.body.name;
    var image = req.body.image;
    var desc = req.body.description;    // name attribute in input form
    var author = {
        id: req.user._id,
        username: req.user.username     //req.user comes from passport
    };
    var newCampground = {name: name, image: image, description: desc, author: author};  // Add three items mentioned in schema and submitted by new form
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            // If no error, We redirect to /campgrounds page
            //console.log(newlyCreated)
            res.redirect("/campgrounds");
        }
    });
});

// NEW - Show Form to create new Campground
router.get("/new", isLoggedIn, function(req, res){
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

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){  // first we check if we have a campground with that id (think req.params.edit) was available
        if (err){
            res.redirect("/campgrounds")
        }else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    })
});


// UPDATE CAMPGROUND ROUTE
router.put("/:id",  function(req, res){
    // Find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    
    // redirect somewhere (show page)
})

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});


//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
