const User = require('../models/user');
const hashPassword = require('../helpers/passwordHelper');

const registerUser = async(req,res) => {
    try{
        //check if request body is empty
        if(!req.body){
            return res.status(400).json({
                success : false,
                message : "Please entered the required details."
            })
        }

        const {username,email,password,profilePic} = req.body;

        //check if email already exists
        const checkEmail = await User.findOne({email : email});
        if(checkEmail != null){
            return res.status(400).json({
                success : false,
                message : "Email already in use. Please use a different email to register."
            })
        }


        //hash the password
        const hashedPassword = await hashPassword(password);

        //create a new user and save it to database
        const newUser = new User({
            username,
            email,
            password : hashedPassword,
            profilePic
        })

        await newUser.save();

        res.status(201).json({
            success : true,
            message : "User has been created successfully.",
            data : newUser
        })

    }catch(error){
        console.log("Error creating a user : ",error);
        res.status(500).json({
            message : "Something went wrong . Please try again."
        })
    }
}
const updateUser = async(req,res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({
                success : false,
                message : "Please give the userId"
            })
        }else if(req.body.password){
            return res.status(400).json({
                success : false,
                message : "You cannot change the password in this routes. To change the password use password change"
            })
        }

        const userExists = await User.findById(req.params.id);
        if(!userExists){
            res.status(404).json({
                success : false,
                message : "No such user exists . Please check the id and try again"
            })
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set : {
                username : req.body.username,
                email : req.body.email,
                profilePic : req.body.profilePic
            }
        },{new : true});

        res.status(200).json({
            success : true,
            message : "The user data has been updated",
            newData : updatedUser
        })
        
        
    }catch(error){
        console.log("Error creating a user : ",error);
        res.status(500).json({
            message : "Something went wrong . Please try again."
        })
    }
}
const deleteUser = async(req,res) => {
    try{
        
    }catch(error){
        console.log("Error creating a user : ",error);
        res.status(500).json({
            message : "Something went wrong . Please try again."
        })
    }
}
const getUserDetail = async(req,res) => {
    try{

    }catch(error){
        console.log("Error creating a user : ",error);
        res.status(500).json({
            message : "Something went wrong . Please try again."
        })
    }
}

module.exports = {
    registerUser,
    getUserDetail,
    deleteUser,
    updateUser
}