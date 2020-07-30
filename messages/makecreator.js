let express = require("express");
let app = express.Router();
let models = require("../models");
let count = 0;
let Op = require("sequelize").Op;
app.post('/',(req,res)=>{
    models.userdetails.findOne({attributes:['id'],
    where: {username:req.body.creator}})
    .then((result) => {
        // console.log(result)
        let creatorid=result.dataValues.id
        models.userdetails.findOne({attributes:['id'],
    where: {username:req.body.username}})
    .then((rest) => {
        // console.log(rest)
        let userid=rest.dataValues.id
    models.usersinchannel.update({roleId:3},
        {where:{channelId:req.body.channelid,userId:userid}},)
        models.usersinchannel.update({roleId:2},
        {where:{channelId:req.body.channelid,userId:creatorid}})
    .then((res)=>{
        models.channellist.update({creatorId:userid},{where:{id:req.body.channelid}})
        .then((data)=>{
            console.log(data)
    })
    // console.log(creatorid,userid)
    })
    })
    // console.log(req.body)
})
})
module.exports=app;
