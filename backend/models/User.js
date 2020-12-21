const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:String,
    name:String,
    password:String,
    access:{type:Number, default:1}
})

module.exports = mongoose.model('User', userSchema)