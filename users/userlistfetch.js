let express = require("express");
let app=express.Router();
let Op=require('sequelize').Op;
let model=require('../models')
app.post('/',(req,res)=>
{
    model.userdetails.findAll({attributes:['id','username'],where:{[Op.not]:{username:req.body.loggeduser}}})
    .then(result=>{
        console.log(result)
        res.send(result)
    })
})
module.exports=app;