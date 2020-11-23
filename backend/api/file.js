const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './assets/images')
    },
    filename:function(req,file,cb){
        cb(null, file.originalname.toString())
    }
})
var upload = multer({storage:storage})
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
/**@route - file/uploadfile
 * @description - used to upload files to the server
 */
router.post('/file/uploadimage', upload.single('image'), (req,res)=>{
    console.log(req.file, req.body)
        let image = req.file
        if(!image){
            console.log(image)
            return res.json({
                message:"No file found",
                success:false

            })
        }
        else{
            return res.json({
                message:"Upload completed",
                success:true
            })
        }
    })

router.get('/file/getimage/:file', (req,res)=>{
        let {file} = req.params
        res.sendFile(path.resolve('./assets/images/' + file), (err)=>{
            if(err)
            {
                console.log(err)
                return res.json({
                    success:false,
                    file
                })
            }
        })
    
})

router.get('/posts/getvideo/:file', (req,res)=>{
    let {file} = req.params
    res.sendFile(path.resolve('./assets/videos/' + file), (err)=>{
        if(err)
        {
            console.log(err)
            return res.json({
                success:false,
                file
            })
        }
    })

})

module.exports = router