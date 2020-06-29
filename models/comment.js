var mongoose = require('mongoose');


var commentSchema = mongoose.Schema({
    text: String,
//    author: String
    author : {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);


// username collection is like this
// {
//      username: "Tuna"
//      _id     : 23423r3..
//      hash    : 32423kjlkhsgsh...
//      salt    : "world spins round and roudn"
// }
//
// We don't wan to store everything, so we tak important bits (username, id) and save under author object
