const bcrypt = require('bcrypt');

const hashPassword = async(password) => {
    try{
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);
        return hashedPassword;
    }catch(error){
        console.log("Error occured while hashing password: ",error);
        throw new Error("Error occured while hasing password.");
    }
}

const comparePassword = async(inputPassword,userPassword) => {
    try{
        return await bcrypt.compare(inputPassword,userPassword);
    }catch(error){
        throw new Error("Error comparing password :",error)
    }
}

module.exports = {hashPassword,comparePassword};