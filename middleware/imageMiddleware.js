const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploadedImages/');
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})

const imageFilter = (req,file,cb) =>{
    
    if(file.mimetype.startsWith('image/')){
        cb(null,true)
    }else{
        cb(new Error("Not an image. Please upload an image"))
    }

}
module.exports = multer({
    storage : diskStorage,
    fileFilter : imageFilter,
    limit : {
        fileSize : 5 * 1024 * 1024
    }
})