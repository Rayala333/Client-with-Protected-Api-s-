const multer  = require("multer")
const path = require("path")


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

// const upload = multer({storage:storage})

module.exports = multer({storage:storage})