const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Post = require('./models/Post')
router.get('/posts', ()=>{
    Post.find({})
    .then((posts)=>{
        if(posts)
        return res.json({
            posts:posts
        })
        else
        return res.json({
            posts:[],
            message:"No posts found"
        })
    })
    .catch((error)=>{return res.json({message:error})})
})

router.post('/posts/new',()=>{
    Post.save({body:req.body})
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

router.delete('/posts/delete',()=>{
    Post.delete({_id:req.body.id})
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

router.put('/posts/update',()=>{

})