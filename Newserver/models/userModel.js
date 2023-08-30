const mongose = require('mongoose')

const userScema = mongose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    type:{
        type:Number,
        require:true
    }

})

module.exports = mongose.model("UserData",userScema)

