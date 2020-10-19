const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:String,
    description:String,
    byline:String,
    date:Date, 
    tags:Array,
    data:Array
})

module.exports = mongoose.model('Post', postSchema)