const Image = require('../models/image');
const {cloudinaryUploader,deleteFromCloudinary} = require('../helpers/cloudinaryHelper');
const fs = require('fs')

const setProfilePic = async(req,res) => {
    try{
        console.log("entered controller")
        if(!req.file){
            res.status(400).json({
                success : false,
                message : "Please upload an image"
            })
        }
        
        //upload the image to cloudinary
        const cloudinaryUpload = await cloudinaryUploader(req.file.path);

        //store image to the database
        const newImage = new Image({
            url : cloudinaryUpload.url,
            publicId : cloudinaryUpload.public_id
        })
        await newImage.save();

        res.status(201).json({
            success : true,
            message : "Image was uploaded successfully",
            data : newImage
        })


    }catch(error){
        fs.unlinkSync(req.file.path);
        console.log("Some error occured in setting the profile pic : ",error);
        res.status(500).json({
            message : "Something went wrong . Please try again..."
        })
    }
}

const deleteProfilePic = async(req,res) => {
    try{
        if(!req.params){
            res.status(400).json({
                success : false,
                message : "No id found.."
            })
        }

        const foundImage = await Image.findById(req.params.id);
        if(!foundImage){
            res.status(400).json({
                success : false,
                message : "No image found. Please check the id"
            })
        }

        //delete from cloudinary
        deleteFromCloudinary(foundImage.publicId);

        const deleteFromDatabase = await Image.findByIdAndDelete(req.params.id);

        

    }catch(error){
        console.log("Error occured deleting profile pic: ",error);
        res.status(500).json({
            message : "Something went wrong. Please try again "
        })
    }
}

module.exports = {
    setProfilePic
}