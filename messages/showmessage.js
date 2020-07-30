let express=require('express');
let app=express.Router();
let model=require("../models")
let Op=require('sequelize').Op
app.post('/',(req,res)=>{
    model.userdetails
.findOne({attributes:['id'],where:{username:req.body.sender}})
    .then(data=>{
        // console.log(data)
         let senderid=data.dataValues.id;
            // console.log(senderid)
            // res.send(data)
            model.messagetable.findAll({attributes:['messages','messagecount'],where:{recieverId:senderid},
        include:[{
            model:model.userdetails,
            as:'sender',attributes:['username','id'],
        },]
        }  )
         .then(msg=>{
            //  console.log("sujith",msg)
             if(msg===null)
             {
                 res.send('nopo');
             }
             else{
            
                res.send(msg)
             }
           
        })
        })
        
})
module.exports=app;