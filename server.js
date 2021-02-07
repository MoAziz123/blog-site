/***CONFIG***/
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const path = require('path')
/***LIBRARIES***/
const js_yaml = require('js-yaml')
const fs = require('fs')
const cors = require('cors')
const bodyparser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 8080


app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.use('/', (req,res,next)=>{
        let token = req.get('x-access-token')
        if(token != null){
            let decoded = jwt.decode(token, {complete:true})
            if((Date.now()/1000) > decoded.payload.exp){
                return res.json({auth:false, redirect:"/login",  message:"You are not authenticated"})
                
            }
           
            return next()
        }
        return next()
    
})

app.use('/api/', require('./api/blogpost'))
app.use('/api/', require('./api/comment'))
app.use('/api/', require('./api/login'))
app.use('/api/', require('./api/file'))
app.use('/api/', require('./api/auth'))

if(process.env.NODE_ENV == "production"){
    app.use(express.static('./frontend/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "build", "index.html"))
})
}
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/blog-site",{useNewUrlParser:true},()=>{
    console.log("MONGODB CONNECTION ESTABLISHED")
    app.listen(port, ()=>{
        console.log("API CONNECTION ESTABLISHED")
    })
})






