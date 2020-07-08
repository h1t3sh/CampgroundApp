
var express = require('express');
var router = express.Router({mergeParams: true}); // inorder to access request parameter (:id) in routes we pass mergeParams
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// Comments New
router.get("/new", isLoggedIn, function(req, res){    //isloggedIn middleware
    //console.log(req.params.id)
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground: campground});
        }
    })
});

// Comments Create
router.post("/", isLoggedIn, function(req, res){   // check if post req that comes is from authenticated user
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
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
//                    console.log("Printing req.user: " + req.user)
                    comment.save();
                    // save comment
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    // redirect campground to show page
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
});

// Edit comments route
router.get("/:comment_id/edit", function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){        // from the full path variables
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment:foundComment})
        }
    });
});

// COMMENT UPDATE
router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
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
