const bcrypt = require('bcrypt');
const {comparePassword} = require('../helpers/passwordHelper');
const generateToken = require('../helpers/tokenHelper');
const User = require('../models/user');

const userLogin = async(req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Email or password is missing"
            })
        }

        const user = await User.findOne({email : email});
        if(!user){
            return res.status(404).json({
                success : false,
                message : "No user is registered with the given email. Please register first."
            })
        }

        const matchResult = await comparePassword(password,user.password);
        console.log("compare Password : ",matchResult);

        if(!matchResult){
            console.log("entered match pass")
            return res.status(401).json({
                success : false,
                message : "Wrong password"
            })
        }

        const token = await generateToken(user);

        res.status(200).json({
            success : true,
            message : "Login was successful",
            token 
        })


    }catch(error){
        console.log("Error in login : ",error)
        res.status(500).json({
            message : "Something went wrong. Please try again"
        })
    }
}

module.exports = userLogin;