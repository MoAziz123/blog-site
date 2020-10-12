const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    title: String,
    date: {type:date,default:Date.now()}, 
    data: {
        code:String,
        image:String,
        video:String,
        text:String,
        order:Array


    },
    data:Array

})

module.exports = mongoose.model('Post', postSchema)