/***CONFIG***/
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

/***LIBRARIES***/
const js_yaml = require('js-yaml')
const fs = require('fs')
const cors = require('cors')
const bodyparser = require('body-parser')



app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

/*app.use('/', (req,res,next)=>{
    console.log(req.path)
    if(req.path.includes('/comment') || req.path.includes('/posts')){
        let token = req.get('x-access-token')
        let decoded = jwt.decode(token, {complete:true})
        if((Date.now()/1000) > decoded.payload.exp){
            res.send({auth:false, redirect:"/login", message:"You are not authenticated"})
            res.status(200)
            res.end()
        }
        console.log(token)
        return next()
    }
    next()
})*/
app.use('/', require('./api/blogpost'))
app.use('/', require('./api/comment'))
app.use('/', require('./api/login'))

mongoose.connect("mongodb://localhost:27017/blog-site",{useNewUrlParser:true},()=>{
    console.log("MONGODB CONNECTION ESTABLISHED")
    app.listen(8080, ()=>{
        console.log("API CONNECTION ESTABLISHED")
    })
})






