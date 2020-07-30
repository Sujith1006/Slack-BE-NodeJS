let express = require("express");
let app = express.Router();
let models = require("../models");
let count = 0;
let Op = require("sequelize").Op;
app.post('/',(req,res)=>{
    models.userdetails.findOne({attributes:['id'],where:{username:req.body.username}})
    .then((result) => {
        // console.log(result)
    models.usersinchannel.update({roleId:2},{where:{channelId:req.body.channelid,userId:result.dataValues.id}})
    .then((res)=>{
        console.log("admin MAde")
    })

    })
})
module.exports=app;
