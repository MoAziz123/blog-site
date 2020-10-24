const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    post_id:String,
    text:String,
    edited:Boolean,
    date_posted:{type:Date, default:Date.now()}

})

module.exports = mongoose.model('Comment', commentSchema)