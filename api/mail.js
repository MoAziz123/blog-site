const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
const User = require('../models/User')


router.post('/mail/forget',(req,res)=>{
    if(!req.body.email){
        return res.json({
            message:"Email not provided"
        })
    }
    User.find({email:req.body.email})
    .then((email)=>{
        if(user){
            //TODO: send mail
            
        }
        return res.json({
            message:"Account not found within database"
        })
    })

})

router.post('/mail/verify',(req,res)=>{

})

module.exports = router