const router = require('express').Router()

//model
const user = require('../SchemaModel/model')

const middleware = require('../middleware/middleware')


//get Api

router.get('/user',middleware, async(req,res)=>{
    
    const userDetails = await user.find()
    if(!userDetails){
        return res.status(400).send("user details Not match")
    }else{
        res.status(200).json(userDetails)
    }
})

router.get('/details', async(req,res)=>{
    const details = await user.find() 
    res.json(details)
})




module.exports = router