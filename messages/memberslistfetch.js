var express=require('express')
let app = express.Router();
let models = require("../models");
let Op = require("sequelize").Op;
app.post('/',(req,res)=>{
    models.usersinchannel.findAll({attributes:['userId'],where:{channelId:req.body.channelid},
    include:[
        {
            model:models.userdetails,
            attributes:['username'],
            as:'user',
            where:{username:{[Op.not]:req.body.username}}
        },{
            model:models.roletable,
            attributes:['roletype'],
            as:'role'

        }
    ]})
    .then((result) => {
       console.log(result) 
       res.send(result)
    })
})
module.exports=app;