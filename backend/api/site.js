const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const yaml = require('js-yaml')
const fs = require('fs')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))


router.get('/site/site_name', (req,res=>{
    let file = yaml.safeLoadAll(fs.readFileSync('./config.yaml', 'utf-8'))
    return res.json({
        site_name: file.site_name
    })
}))
//TODO: get site name from api

router.post('/auth/change', (req,res)=>{
    if(req.body.site_name){
        let file = yaml.safeLoadAll(fs.readFileSync('./config.yaml', 'utf-8'))
        try{
            file.safeDump({
            'site_name':req.body.site_name
           })
           return res.json({
               message:"Site name successfully updated"
           })
    }
    catch{
        return res.json({
            message:"Site name update unsuccessful"
        })
    }

    }
})