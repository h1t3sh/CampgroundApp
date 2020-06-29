var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,       // refering comment object id
            ref: "Comment"          // Model which v r going to refere, here v refer Comment model
        }
    ]
});
// Make a model from Schema, so that we can use useful methods
module.exports = mongoose.model("Campground", campgroundSchema);    // return the model to app.js

