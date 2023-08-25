const jwt = require('jsonwebtoken')
// const model = require('../SchemaModel/model')
require('dotenv').config()

// const config = process.env;

const Auth = async (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
    try{
        
        // const token = req.cookies.jwt;
        // const verifyUser = jwt.verify(token,'process.env.SECURET_KEY');
        // console.log(verifyUser)
        // next()

       const decoded =  jwt.verify(token, process.env.SECURET_KEY,(err,res)=>{
            // console.log(err,'err')
            // console.log(res,"result")
            if(err){
                return "token expired "
            }

            return res

        });
        if(decoded=="token expired"){
                //  console.log("JWT......")
                return res.send({status:"error",data:"token expried"})
        }
        req.user = decoded;
        // console.log(decoded.ID,'user')
        // console.log(req.user.exp,'user-1')
        next()

    }catch(err){
        res.status(401).send(err.message)
    }
}
module.exports = Auth