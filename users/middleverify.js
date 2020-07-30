let express = require("express");
let jwt = require("jsonwebtoken");
let app = express.Router();
module.exports=function(req,res,next)
{
    let token=req.headers.authorization.slice(7,);
    jwt.verify(token,'sujith',function(err,decoded)
    {
        if(err) res.status(401).send("Invalid auth")
        else{
            req.token=decoded
            next();

            
        }
    })

}
