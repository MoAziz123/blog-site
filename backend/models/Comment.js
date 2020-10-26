const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    post_id:String,
    text:String,
    edited:Boolean,
    date_posted:{type:Date, default:Date.now()},
    user_id:String

})

module.exports = mongoose.model('Comment', commentSchema)