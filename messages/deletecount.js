let express=require('express')
let app=express.Router();
let models=require('../models')
let Op=require('sequelize').Op
app.post('/',(req,res)=>{
            let senderid=req.body.senderid;
            let name=req.body.name;
    models.userdetails.findOne({attributes:['id'],where:{username:name}})
    .then(user=>{
       let loged=user.id
       console.log(senderid,loged)
      models.messagetable.update({messagecount:0},{where:{[Op.and]:{senderId:senderid,recieverId:loged}}})

    })
    
  
}
)
module.exports=app;