const jwt = require('jsonwebtoken');
const validateToken = async(req,res,next) => {

    try{
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(400).json({
                success : false,
                message : "No access token found . Please provide an access token"
            })
        }
        
        const tokenData = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!tokenData.user_id){
            return res.status(401).json({
                success : false,
                message : "No user id found in token."
            })
        }
    
        req.user_id = tokenData.user_id;
        next();
    }catch(error){
        console.log("Error occured while validating token. ",error);
        if(error instanceof jwt.TokenExpiredError){
            return res.status(400).json({
                success : false,
                message : "The token has expired . Please login again."
            })
        }
        return res.status(500).json({
            success : false,
            message : "Something went wrong . Please try agian."
        })
    }

}

module.exports = {validateToken};