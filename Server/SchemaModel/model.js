const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const user = new mongoose.Schema({
    name:{
        type:"string",
        require:true
    },
    email:{
        type:"string",
        require:true
    },
    password:{
        type:"string",
        require:true
    },
    conformPassword:{
        type:"string",
        require:true
    },
    gender:{
        type:"string",
        require:true
    }
 
})

//hashing the password
user.pre('save', async function(next){
    try{
        if(this.isModified('password')){
        const salt = await bcrypt.genSalt(12)
        this.password = await bcrypt.hash(this.password,salt)
        this.conformPassword = await bcrypt.hash(this.conformPassword,salt)
        next()
        }
    }catch(err){
        next(err.mesage)
    }
});


// generating token
// user.methods.generateAuthToken = async function(){
//     try{
//         let mytoken = jwt.sign({_id:this._id},process.env.SECURET_KEY);
//         const token = jwt.sign({ID},process.env.SECURET_KEY,{expiresIn:2000})
//         this.token = tokens.concat({token:mytoken});
//         await this.save();
//         return mytoken;
//     }catch(err){console.log(err.message)}
// }



module.exports = mongoose.model('userDetails',user)