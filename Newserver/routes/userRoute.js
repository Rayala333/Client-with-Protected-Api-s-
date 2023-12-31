const express = require("express")

const user_route = express()
const bodyParser = require("body-parser")

user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({extended:true}))

const multer  = require("multer")
const path = require("path")

user_route.use(express.static('Public'))


const storage =  multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../Public/userImages'),function(error,success){
            if(error) throw error.message
        });
    },
    filename:function(req,file,cb){
        const name =  Date.now()+'-'+file.originalname;
        cb(null,name,function(error1,success){
            if(error1) throw error1
        })
    }
})

const upload = multer({storage:storage})

const user_controller = require('../controllers/userController')

user_route.post('/register',upload.single('image'),user_controller.register_user)

module.exports = user_route