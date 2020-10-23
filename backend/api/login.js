const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
const User = require('../models/User')

/**@route -  /submit
 * @description - submits the login details to authenticate
*/

router.post('/login/submit' ((req,res)=>{
    User.findOne({email:req.body.email, password:req.body.password})
    .then((user)=>{
        if(user.email && !user.password)
        {
            return res.json({
                message:"incorrect password",
                auth:false
            })

        }
        else if(user.email && user.password)
        {
            return res.json({
                message:"Access granted",
                auth:true
            })
        }
        else if(!user.email && !user.password){
            return res.json({
                message:"Unable to locate email, or password",
                auth:false
            })
        }
    })

}))

router.post('/login/register', (req,res)=>{
    let new_user = new User({
        email:req.body.email,
        password:req.body.password,
        name:req.body.name
    })
    .then((user)=>{
        if(user){
            return res.json({
                message:"Account successfully created",
                success:true
            })
        }
        else{
            return res.json({
                message:"Account unable to be created",
                success:false
            })
        }
    })
})