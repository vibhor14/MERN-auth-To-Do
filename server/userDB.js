const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    homeList: [String],
    workList: [String]
});

//UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);