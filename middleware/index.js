// all middleware goes here
var Campground = require('../models/campground');
var Comment = require('../models/comment');

var middlewareObj = {};     // declare the object

// declare functions in the object

middlewareObj.checkCamgproundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            }else{
                // does user own campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next(); // GO AHEAD
                }else{
                    res.redirect("back");
                }
            }
        })
    }else{
        res.redirect("back"); // send user back to that page only
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }else{
                // does user own Comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next(); // GO AHEAD
                }else{
                    res.redirect("back");
                }
            }
        })
    }else{
        res.redirect("back"); // send user back to that page only
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login First")
    res.redirect("/login");
}

// exporting the object
module.exports = middlewareObj;
