const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
const Post = require('../models/Post')
router.get('/posts', (req,res)=>{
    Post.find({})
    .then((posts)=>{
        if(posts.length > 0){
            return res.json({
                posts:posts,
                message:"Posts found"
            })
        }
        else
        return res.json({
            posts:[],
            message:"No posts found"
        })
    })
    .catch((error)=>{return res.json({message:error})})
})

router.post('/posts/searchOne', (req,res)=>{
    console.log(req.body.id)
    Post.findOne({_id:req.body.id})
    .then((post)=>{
        if(post){
            return res.json({post:post, message:"Post found"})
        }
        return res.json({
            message:"Post unable to be found"
        })
    })
})

router.post('/posts/new',(req,res)=>{
    let new_post = new Post({
        title:req.body.title,
        date:req.body.date,
        tags:req.body.tags,
        description:req.body.description,
        byline:req.body.byline,
        data:req.body.data
    })
    .save()
    .then((post)=>{
        if(post){
            return res.json({
                message:"Post created successfully"
            })
        }
        else{
            return res.json({
                message:"Post creation unsuccessful"
            })
        }
    })
    .catch((error)=>{return res.json({message:error})})
})

router.delete('/posts/delete',(req,res)=>{
    Post.findOneAndDelete({id:req.body.id})
    .then((post)=>{
        if(post){
            return res.json({
                message:"Post deletion successful"
            })
        }
        else{
            return res.json({
                message:"Post deletion unsuccessful"
            })
        }
    })
    .catch((error)=>{return res.json({message:error})})
})

router.put('/posts/update',(req,res)=>{
})

module.exports = router