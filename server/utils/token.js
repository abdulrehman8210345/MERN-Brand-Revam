import jwt from "jsonwebtoken";


export const generateToken = (_id,userType) =>{
    return jwt.sign({
        _id,
    userType},
            process.env.JWT_SECRET_KEY
        ,{
            expiresIn : "2d"
        }
        
    )
}