/***CONFIG***/
const express = require('express')
const app = express()
const mongoose = require('mongoose')

/***LIBRARIES***/
const js_yaml = require('js-yaml')
const fs = require('fs')
const cors = require('cors')
const bodyparser = require('body-parser')


app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use('/', require('./api/blogpost'))

mongoose.connect("mongodb://localhost:27017/blog-site",{useNewUrlParser:true},()=>{
    console.log("MONGODB CONNECTION ESTABLISHED")
    app.listen(8080, ()=>{
        console.log("API CONNECTION ESTABLISHED")
    })
})






