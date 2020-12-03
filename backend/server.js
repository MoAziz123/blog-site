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

app.use('/', (req,res,next)=>{
        let token = req.get('x-access-token')
        if(token != null){
            let decoded = jwt.decode(token, {complete:true})
            if((Date.now()/1000) > decoded.payload.exp){
                res.send({auth:false, redirect:"/login",  message:"You are not authenticated"})
                
            }
            else{
                return res.json({
                    user: decoded.payload.user
                })
            }
            return next()
        }
        return next()
    
})
app.use('/', require('./api/blogpost'))
app.use('/', require('./api/comment'))
app.use('/', require('./api/login'))
app.use('/', require('./api/file'))
app.use('/', require('./api/auth'))

mongoose.connect("mongodb://localhost:27017/blog-site",{useNewUrlParser:true},()=>{
    console.log("MONGODB CONNECTION ESTABLISHED")
    app.listen(8080, ()=>{
        console.log("API CONNECTION ESTABLISHED")
    })
})






