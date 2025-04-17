const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');

const cloudinaryUploader = async (filePath) => {
    try{
        const uploadedFile = await cloudinary.uploader.upload(filePath);
        return{
            public_id : uploadedFile.public_id,
            url : uploadedFile.url
        }
    }catch(error){
        // fs.unlinkSync(filePath);
        console.log("error occured while uploading image to cloudinary : ",error);
        throw new Error(`Error occured while uploading image  : ${error.message}`)
    }
}

const deleteFromCloudinary = async(publicId) => {
    try{
        await cloudinary.uploader.destroy(publicId);
    }catch(error){
        console.log("Error deleting image from cloudinary : ",error);
    }
}


module.exports = {cloudinaryUploader,deleteFromCloudinary};