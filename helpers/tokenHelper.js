const jwt = require('jsonwebtoken');

const generateToken = async(user) => {
    try{
        const token = await jwt.sign(
            {
                username : user.username,
                email : user.email,
                profilePic : user.profilePic,
                id : user.id
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn : "1h"}
        )

        return token;

    }catch(error){
        console.log("Error generating a token : ",error);
        throw new Error("Error generating a token");
    }
}

module.exports = generateToken;