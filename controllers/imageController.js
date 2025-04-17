const Image = require('../models/image');
const User = require('../models/user');
const {cloudinaryUploader,deleteFromCloudinary} = require('../helpers/cloudinaryHelper');
const fs = require('fs')

const setProfilePic = async(req,res) => {
    try{
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

const validateUserAuthority = async(req,res,next) => {
    try{
        if(!req.params){
            return res.status(400).json({
                success : false,
                message : "No id found.."
            })
        }
        const userData = await User.findById(req.user_id);

        if(userData.profilePic.toString() !== req.params.id){
            return res.status(401).json({
                success : false,
                message : "You are not authorized to delete this image. This picture belongs to a different account."
            })
        }
        next();
    }catch(error){
        console.log("Error occured while checking user authorization.");
        throw new error("Error occured while checking user authorization. ", error)
    }
}

const deletePicImages = async(req,res,next) => {
    try{
        const foundImage = await Image.findById(req.params.id);
        if(!foundImage){
            return res.status(400).json({
                success : false,
                message : "No image found. Please check the id"
            })
        }
        //delete from cloudinary
        deleteFromCloudinary(foundImage.publicId);

        const deleteFromDatabase = await Image.findByIdAndDelete(req.params.id);

        // return res.status(200).json({
        //     success : true,
        //     message : "Image successully deleted.",
        //     deletedImage : deleteFromDatabase.id
        // })
        next();

    }catch(error){
        console.log("Error occured deleting profile pic: ",error);
        res.status(500).json({
            message : "Something went wrong. Please try again "
        })
    }
}

const deleteUserProfilePic = async(req,res) => {
    try{
        const updateUser = await User.findByIdAndUpdate(req.user_id,{
            $set : {
                profilePic : null,
            }
        },{new : true})
        return res.status(200).json({
            success : false,
            message : "Profile pic deleted",
            data : updateUser
        })
    }catch(error){
        console.log("Error occured while deleting user profile pic");
        return res.status(500).json({
            success : false,
            message : "Something went wrong. Please try agian."
        })
    }
}

module.exports = {
    setProfilePic,
    validateUserAuthority,
    deletePicImages,
    deleteUserProfilePic
}