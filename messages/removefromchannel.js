let express = require("express");
let app = express.Router();
let models = require("../models");
let count = 0;
let Op = require("sequelize").Op;
app.post('/',(req,res)=>{
    console.log(req.body)
    models.userdetails.findOne({attributes:['id'],where:{username:req.body.username}})
    .then((result) => {
    models.usersinchannel.destroy({where:{channelId:req.body.channelid,userId:result.dataValues.id}})
    .then((data)=>{
        console.log("deleteddd")
    })
    })
})
module.exports=app;