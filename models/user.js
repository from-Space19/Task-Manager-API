const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        maxLength : [100,"The length of the username cannot be more than 100 characters"],
        minLength : [3,"The username should be atleast of 3 characters"],
        required : true,
        trim : true
    },
    email : {
        type :String,
        match : [/^\S+@\S+\.\S+$/,"Invalid email"],
        unique : true,
        required : true,
        trim : true,
        maxLength : [100,"The email cannot of more than 100 characters"]
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minLength : [8,"The password must be of atleast 8 characters"]
    },
    profilePic : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Image',
        required : true
    }
})

module.exports = mongoose.model("User",userSchema);