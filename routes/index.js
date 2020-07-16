
var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require('../models/user');

// Root route
router.get("/", function (req, res){
	res.render("home");
});

// show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user){      //from passport plugin
        if(err){
           // console.log(err);
            req.flash("error", err.message);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
// app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local",   //middleware
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
//        successFlash: 'Logged in successfully!' 
    }),function(req, res){  //callback doesn't do anyting here
});

//logout route
router.get("/logout", function(req, res){
    req.logout();                       // we get this from passport
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});


module.exports = router;
