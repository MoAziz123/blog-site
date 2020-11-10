const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const multer = require('multer')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
const Post = require('../models/Post')
/**@route - upload
 * @description - used for uploading images
 */
router.post('/posts/upload', (req,res)=>{
    if(req.file){

    }
})
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
        private:req.body.private,
        data:req.body.data,
        user_id:req.body.user_id
    })
    .save()
    .then((post)=>{
        if(post){
            return res.json({
                post,
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
//deletes first post
//TODO: change how it deletes post
router.delete('/posts/delete',(req,res)=>{
    Post.findOneAndDelete({id:req.body.id})
    .then((post)=>{
        if(post){
            return res.json({
                post,
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
router.post('/posts/searchUser',(req,res)=>{
    Post.find({user_id:req.body.user_id})
    .then((posts)=>{
        if(posts)
        {
            return res.json({
                posts,
                message:"Personal posts found"
            })
        }
        else
        {
            return res.json({
                posts:[],
                message:"Unable to find personal posts"
            })
        }
    })
})
router.put('/posts/update',(req,res)=>{
    Post.findOneAndUpdate({_id:req.body.id}, {
        title:req.body.title,
        date:req.body.date,
        tags:req.body.tags,
        description:req.body.description,
        byline:req.body.byline,
        data:req.body.data

    })
    .then((post)=>{
        if(post){
            return res.json({
                message:"Post updated",
                post:post
            })
        }
        else{
            return res.json({
                message:"Post update unsuccessful"
            })
        }
    })
    .catch(error=>console.error(error))
})

router.post('/posts/search', (req,res)=>{
    Post.find({})
    .then((posts)=>{
        if(posts.length > 0)
        {
            post_array = posts.filter((post)=>{
                let title = post.title.toLowerCase()
                if(title.startsWith(req.body.search.toLowerCase())){
                    return post
                }
            })
            return res.json({
                posts:post_array,
                message:"Posts found successfully"
            })
        }
        else
        {
            return res.json({
                message:"Unable to find psots"
            })
        }
    })
    .catch(error=>console.error(error))
})
module.exports = router