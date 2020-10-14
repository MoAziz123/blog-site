/***CONFIG***/
const express = require('express')
const app = express()
const mongoose = require('mongoose')

/***LIBRARIES***/
const js_yaml = require('js-yaml')
const fs = require('fs')
const cors = require('cors')
const bodyparser = require('body-parser')
const doc = js_yaml.safeLoad(fs.readFileSync('config.yaml'))



app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
app.use(cors())

mongoose.connect("http://localhost:27017/",()=>{
    console.log("MONGODB CONNECTION ESTABLISHED")
})
.then(()=>{
    app.listen(8080,()=>{console.log("APP CONNECTION ESTABLISHED")})
})





