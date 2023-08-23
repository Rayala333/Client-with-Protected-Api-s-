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

        const decoded = jwt.verify(token, process.env.SECURET_KEY);
        req.user = decoded.user;
        next()

    }catch(err){
        res.status(401).send(err.message)
    }
}
module.exports = Auth