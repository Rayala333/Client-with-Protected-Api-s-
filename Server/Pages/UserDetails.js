const router = require('express').Router()

//model
const user = require('../SchemaModel/model')

const middleware = require('../middleware/middleware')


//get Api

router.get('/user',middleware, async(req,res)=>{
    
    const userDetails = await user.findById(req.user.ID)
    // console.log(req.user.exp,"now")
    const Exp = req.user.exp
    if(!userDetails){
        return res.status(400).send("user details Not match")
    }else{
        res.status(200).json({userDetails,Exp})
    }
})

router.get('/details', async(req,res)=>{
    const details = await user.find() 
    res.json(details)
})




module.exports = router