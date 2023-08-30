const express = require('express')
const app = express()



const mongose = require('mongoose')

const mongo = 'mongodb+srv://Rayala:prasad333@prasad.lterq.mongodb.net/RayalaDb'

mongose.connect(mongo).then((res)=>{
    console.log("DB-Connected Success")},
    (err)=>{
        console.log(err.message,"db connection fail")
    })

const user_routes = require("./routes/userRoute")
app.use('/api',user_routes)


app.listen(8181,()=>{
        console.log("server started at port :",`http://localhost:${8181}`)
    })
    