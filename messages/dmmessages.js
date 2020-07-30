let express=require('express');
let app=express.Router();
const Op = require('sequelize').Op
let model=require("../models")
app.post('/',(req,res)=>{
    let selectedname=req.body.selectedname;
    let logedinuser=req.body.username;
    model.userdetails
.findAll({
    attributes:['id'],
    where: {
      username: {
        [Op.or]: [selectedname,logedinuser]
      }
    }
  })
    .then(data=>{
        // console.log(data[1].id)
         let logged=data[1].id;
         let selected=data[0].id
            // console.log(senderid)
            // res.send(data)
        model.messagetable.findAll({ 
        attributes: ['messages'],
         where: {
             [Op.and]:{
                 recieverId:{[Op.or]:[selected,logged]},
                 senderId:{[Op.or]:[selected,logged]}
             }
         }} 
        
       
         )
         .then(msg=>{
             console.log(msg)
             if(msg.length==0)
             {
                 res.send('nopo');
             }
             else{
            
                res.send(msg)
             }
           
        })
       .catch(err=>{
           console.log(err);
       })
        })
        
})
module.exports=app;