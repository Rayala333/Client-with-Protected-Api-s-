const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const nodemailer = require('nodemailer');

//model
const user = require('../SchemaModel/model')

const middleware = require('../middleware/middleware')

const upload = require('./UploadImage')

//Api"s

// Registation api
router.post('/register',upload.single('image'),async (req,res)=>{
    const {name,email,password,conformPassword,gender} = req.body
    const image = req.file.filename
    // const {name} = req.body
    if(!name || !email || !password || !conformPassword || !gender){
        return res.status(422).json({error:"plz filled the field requre"})
    }
    try{
        let exist = await user.findOne({email})

        if(exist){
            return res.status(401).json("Email already Exist")            
        }else if(password !== conformPassword){
            return res.status(400).send("pasword miss match...")
        }else{
            let newuser=new user({
                name,email,password,conformPassword,gender,image
            })

            await newuser.save()
            
            res.status(200).send(`Registration success ${newuser}`)
        }
        
    }catch(err){
        console.log(err.message)
    }
    
})

// Login api
router.post('/login',async (req,res)=>{
   const {email,password}=req.body
    try{
        if(!email || !password){
            return res.status(400).json({error:"Plz filled the data"})
        }

        const useremail = await user.findOne({email:email})
        // console.log(useremail)
        // const isMatch = await bcrypt.compare(password,useremail.password)

        if(!useremail){
            return  res.status(403).json({error:"User not found"})
        }else{
            const isMatch = await bcrypt.compare(password,useremail.password)
            
            if(!isMatch){
                return res.status(403).json({error:"Invalied cradencial"})
            }else{
                    const ID = useremail._id
                    // console.log(ID)

                    // const token = await useremail.generateAuthToken();
                    // console.log(token)

                    // res.status(200).send("user login success")
                    // res.json(token)

                    const token = jwt.sign({ID},process.env.SECURET_KEY,{expiresIn:1000})
                    // res.cookie("x-access-token",token)
                    console.log(token,token.exp,'find the data')
                    // res.cookie.localStorage.setItem('token', token);
                //  res.status(200).send(`"user login Success"${token}`)
                return res.json(token)
            }
        }     
    }catch(err){
        console.log(err.message)
    }
    // console.log("login")
    // res.send("hi login")
})

//get Api

// router.get('/user',middleware, async(req,res)=>{
    
//     const userDetails = await user.find()
//     if(!userDetails){
//         return res.status(400).send("user details Not match")
//     }else{
//         res.status(200).json(userDetails)
//     }
// })

// router.get('/details', async(req,res)=>{
//     const details = await user.find() 
//     res.json(details)
// })


router.post('/forget-password', async(req,res)=>{

    const {email}=req.body

    const useremail = await user.findOne({email:email})

    if(!useremail){
        return  res.status(403).json({error:"User not found"})
    }else{
        const Id=useremail._id

        const token = jwt.sign({Id},'FORGOT_SECURET_KEY',{expiresIn:1000})

        // return res.send(token)
        // user.resetToken = token;
        const link = `http://localhost:3000/reset-password/${Id}/${token}`
        // console.log(link,"link")
       
    }

})


router.get('/reset-password/:Id/:token',(req,res)=>{
    const {Id,token}=req.params
    console.log(req.params)
})

module.exports = router