const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{type:String, default:""},
    description:{type:String, default:""},
    byline:{type:String, default:""},
    date:{type:Date, default:""}, 
    tags:Array,
    data:Array,
    user_id:String,
    private:Boolean
})

module.exports = mongoose.model('Post', postSchema)