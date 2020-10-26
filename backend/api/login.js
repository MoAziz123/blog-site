const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
const User = require('../models/User')

/**@route -  /submit
 * @description - submits the login details to authenticate
*/
router.get('/login', (req,res)=>{
    User.find({})
    .then((user)=>{
        return res.json({
            user
        })
    })
})
router.post('/login/submit', (req,res)=>{
    console.log(req.body)
    User.findOne({email:req.body.email, password:req.body.password})
    .then((user)=>{
        if(user){
            if(user.email && !user.password)
            {
                return res.json({
                    message:"incorrect password",
                    auth:false
                })

            }
            let payload ={email:user.email,password:user.password}
            let token = jwt.sign(payload, 'jwt_secret', {expiresIn:'3h'})
            return res.json({
                        message:"User authenticated",
                        token,
                        auth:true,
                        user: {id:user._id, email:user.email, name:user.name},
                        id:user._id
                    })
        }
    else{
        return res.json({
            message:"Unable to locate email, or password",
            auth:false
        })
    }
    })

})

router.post('/login/register', (req,res)=>{
    let new_user = new User({
        email:req.body.email,
        password:req.body.password,
        name:req.body.name
    })
    .save()
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
module.exports = router