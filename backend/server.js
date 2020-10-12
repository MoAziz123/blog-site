/***CONFIG***/
const express = require('express')
const app = express()
const mongoose = require('mongoose')

/***LIBRARIES***/
const js_yaml = require('js-yaml')
const fs = require('fs')
const cors = require('cors')
const bodyparser = require('body-parser')
const conn_string = js_yaml.safeLoad(fs.readFileSync('config.yaml'))
console.log(conn_string)


app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
app.use(cors)

mongoose.connect(conn_string,()=>{
    console.log("MONGODB CONNECTION ESTABLISHED")
})
.then(()=>{
    app.listen(8080,()=>{console.log("APP CONNECTION ESTABLISHED")})
})





