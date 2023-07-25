const mongoose = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
    URL: {
        type: String,
        required: true,
       
    },
    short : {
        type: String,
        required: true,
        
        default: shortId.generate,
    },
    clicks :{
        type: Number,
        required: true,
        default: 0
    }
})

//Export Schema

module.exports = mongoose.model("ShortUrl", shortUrlSchema)
