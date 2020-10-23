const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
const Comment = require('../models/Comment')


/**@route - /search
 * @description - gets comments associated with post
 */
router.post('/comment/search', (req,res)=>{
    Comment.find({post_id:req.body.post_id})
    .then((comments)=>{
        if(comments){
            return res.json({
                comments,
                message:"Found comments",
                success:true
            })
        }
        else{
            return res.json({
                comments:[],
                message:"No comments found",
                success:false
            })
        }
    })
})

/**@route - /add 
 * @description - adds a new comment to a post
*/
router.post('/comment/add', (req,res)=>{
    let new_comment = new Comment({
        post_id:req.body.post_id,
        text:req.body.text,
        edited:req.body.edited
    })
    new_comment
    .save()
    .then((comment)=>{
        if(comment)
        {
            return res.json({
                message:"Comment added",
                success:true

            })
        }
        else
        {
            return res.json({
                message:"Unable to add comment",
                success:false
            })
        }
    })
})



/**@route - /remove
 * @description - removes a comment from a post
 */
router.delete('/comment/remove', (req,res)=>{
    Comment.findOneAndDelete({_id:req.body.id})
    .then((comment)=>{
        if(comment){
            return res.json({
                message:"comment removed",
                success:true
            })
        }
        else{
            return res.json({
                message:"Unable to remove comment",
                success:false
            })
        }
    })
})

 /**@route - /edit
  * @description - updates a comment
  */
 router.put('/comment/update', (req,res)=>{
     Comment.findOneAndUpdate({_id:req.body.id},{
        post_id:req.body.post_id,
        text:req.body.text,
        edited:req.body.edited
     })
     .then((comment)=>{
         if(comment){
             return res.json({
                 message:"Comment updated",
                 success:true
             })
         }
         else{
             return res.json({
                 message:"Unable to update comment",
                 success:false
             })
         }
     })
 })

