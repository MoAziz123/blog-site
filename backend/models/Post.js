const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    title: String,
    date: {type:date,default:Date.now()}, 
    data: Array,

})

module.exports = mongoose.model('Post', postSchema)