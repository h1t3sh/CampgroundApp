var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
// Make a model from Schema, so that we can use useful methods
module.exports = mongoose.model("Campground", campgroundSchema);    // return the model to app.js

