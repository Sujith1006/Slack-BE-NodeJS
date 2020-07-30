let express = require("express");
let app = express.Router();
let models = require("../models");
let count = 0;
let Op = require("sequelize").Op;
app.post('/',(req,res)=>{
    models.userdetails.findOne({attributes:['id'],where:{username:req.body.username}})
    .then((data)=>{
        console.log(data.dataValues.id)
    console.log(req.body.channelid,data.dataValues.id)
    models.usersinchannel.create({channelId:req.body.channelid,userId:data.dataValues.id,roleId:1})
    .then((res)=>
    {
        console.log("insetes")
    })
    })
})
module.exports=app;