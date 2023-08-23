// import express from "express";
// import mongoose from "mongoose";
//  import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import cookieParser from "cookie-parser";


const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')


//Pages or Router's
const UserAuth = require('./Pages/UserAuth')
const userDetails = require('./Pages/UserDetails')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors(
    // {
    //     origin: '*',
    //     methods:["post","get"],
    //     credentials : true,
    // }
))
// app.use(cookieParser())

//db connection
const mongo = 'mongodb+srv://Rayala:prasad333@prasad.lterq.mongodb.net/Myproject'

mongoose.connect(mongo).then((res)=>{
    console.log('db-connect')
},(err)=>{
    console.log(err.message,"db connection fail")
})

//API Auth ROURE

app.use('/',UserAuth,userDetails)



app.listen(process.env.PORT,()=>{
    console.log("server started at port :",`http://localhost:${process.env.PORT}`)
})

