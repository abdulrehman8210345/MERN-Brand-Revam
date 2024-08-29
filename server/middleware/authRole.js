export const authorizeRole = (requiredRole)=>{
    return (req,res,next)=>{
        if(req.user.userType !== requiredRole){
            return res.status(403).json({message : `${req.user.userType} cannot access this resource`})
        }

        next();
    }
}