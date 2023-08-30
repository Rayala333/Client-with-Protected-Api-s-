const User = require('../models/userModel')

const bcrypt = require("bcrypt")

const securePassword = async(password)=>{
        try{
           const passwordHash = await bcrypt.hash(password,12)
           return passwordHash

        }catch(err){
            res.status(400).send(err.message,"error in register")
        }
}

const register_user = async(req,res)=>{
    try{
        const Crypted_password = await securePassword(req.body.password)
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:Crypted_password,
            mobile:req.body.mobile,
            image:req.file.filename,
            type:req.body.type
        })

        const useData = await User.findOne({email:req.body.email});

        if(useData){
            res.status(200).send({success:false,message:"This email is  already exist" })
        }else{
            const user_data  =  await user.save()
            res.status(200).send({success:true,data:user_data })
        }



    }catch(err){
        // res.status(400).send(err.message,"error in register")
        res.status(400).send(err.message)

    }
}

module.exports = {
    register_user
}