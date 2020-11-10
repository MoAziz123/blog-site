const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const hash = require('crypto-js/sha256')
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
    User.findOne({email:req.body.email, password:hash(req.body.password).toString()})
    .then((user)=>{
        if(user){
            if(user.email  == req.body.email && user.password != hash(req.body.password))
            {
                return res.json({
                    message:"incorrect password",
                    auth:false
                })

            }
            
            let payload ={email:user.email,password:hash(user.password)}
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
        password:hash(req.body.password),
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

router.post('/login/search', (req,res)=>{
    User.findOne({_id:req.body.id})
    .then((user)=>{
        if(user){
            return res.json({
                user:user,
                message:"User found"
            })
        }
        else{
            return res.json({
                message:"User not found"
            })
        }
    })
})

router.post('/login/delete', (req,res)=>{
    User.findOneAndDelete({user_id:req.body.user_id})
    .then((user)=>
    {
        if(user){
            return res.json({
                message:"Account deleted successfully"
            })
        }
        else
        {
            return res.json({
                message:"Unable to delete account"
            })
        }

    })
})

router.put('/login/update',(req,res)=>{
    User.findOneAndUpdate({_id:req.body.id},{
        email:req.body.email,
        password:hash(req.body.password),
        name:req.body.username
    })
    .then((user)=>{
        if(user){
            return res.json({
                success:true,
                user:{id:user._id, name:user.name, email:user.email},
                message:"User details updated successfully"
            })
        }
        else
        {
            return res.json({
                message:"Unable to update user"
            })
        }

    })
})
module.exports = router