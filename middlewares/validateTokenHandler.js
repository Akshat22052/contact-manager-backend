const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async(req,res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;    console.log("Authorization Header:", authHeader);
    if (authHeader && authHeader.startsWith("Bearer"))
    {
        token = authHeader.split(" ")[1];
        console.log("Authorization Header:", authHeader);
        console.log("Extracted Token:", token);
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET,(err,decoded) => {
            if (err)
            {
                res.status(401);
                throw new Error("authentication failed");
            }
            // console.log(decoded);
            req.user = decoded.user;
            next();
        });
        if (!token){
            res.status(401);
            throw new Error("No token provided");
        }
}
else 
{
    res.status(401);
    throw new Error("No token provided ");
}


}
);





module.exports = validateToken;

