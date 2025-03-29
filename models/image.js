const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url : {
        type : String,
        required:true,
        trim:true
    },
    publicId : {
        type : String,
        required : true,
        trim : true
    }
})

module.exports = mongoose.model("Image",imageSchema);