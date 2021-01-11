const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
const User = require('../models/User')
const Comment = require('../models/Comment')
const Post = require('../models/Post')

/**@route -  /submit
 * @description - submits the login details to authenticate
*/

router.post('/login/submit', (req,res)=>{
    console.log(req.body.password.toString(), req.body.email)
    User.findOne({email:req.body.email, password:req.body.password.toString()})
    .then((user)=>{
        if(user){
            if(user.email  == req.body.email && user.password != req.body.password)
            {
                return res.json({
                    message:"incorrect password",
                    auth:false
                })

            }
            
            let payload ={email:user.email,id:user._id, name:user.name, access:user.access}
            let token = jwt.sign(payload, 'jwt_secret', {expiresIn:'3h'})
            return res.json({
                        message:"User authenticated",
                        token,
                        auth:true,
                        user: {id:user._id, email:user.email, name:user.name, access:user.access},
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
    .catch(error=>console.log(error))

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
    Post.deleteMany({user_id:req.body.user_id})
    .then((post)=>{
        Comment.deleteMany({user_id:req.body.user_id})
        .then((comment)=>{
            User.findOneAndDelete({_id:req.body.user_id})
            .then((user)=>{
                if(user){
                    return res.json({
                        message:"Account deleted successfully"
                    })
                }
                else{
                    return res.json({
                        message:"Unable to delete account"
                    })
                }

            })
        })

    })
    
})

router.put('/login/update',(req,res)=>{
    User.findOneAndUpdate({_id:req.body.id},{
        email:req.body.email,
        password:req.body.password,
        name:req.body.username
    })
    .then((user)=>{
        if(user){
            Post.updateMany({byline:req.body.username}, {byline:req.body.username})
            .then(()=>{
                Comment.updateMany({byline:req.body.username}, {byline:req.body.username})
                .then(()=>{
                    return res.json({
                        success:true,
                        user:{id:user._id, name:user.name, email:user.email},
                        message:"User details updated successfully"
                    })
                })
                .catch(error=>{return res.json({error})})
            })
            .catch(error=>{return res.json({error})})
        }
        else
        {
            return res.json({
                message:"Unable to update user"
            })
        }

    })
})


//TODO: implement loggedIn route of authorization
router.post('/login/loggedIn',(req,res)=>{
    let token = req.get('Authorization')

})


//TODO: implement adminOnly route of authorization
router.post('/login/adminOnly',(req,res)=>{
    let token = req.get('Authorization')
})
module.exports = router