const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))

/**@route - decode
 * @description- used to decode token so refresh can work properly
 * @since 1.0.0
 */
router.post('/auth/decode', (req,res)=>{
    let token = req.body.token
    if(token){
        let decoded = jwt.decode(token, {complete:true})
        console.log(decoded)
        return res.json({
            user: decoded.payload,
            auth:true
        })
    }
    else{
        return res.json({
            auth:false
        })
    }
    return res.json({
        message:"No data received"
    })

})

module.exports = router