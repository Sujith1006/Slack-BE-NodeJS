let express=require('express');
let app = express.Router();
let model=require("../models");
let bcrypt=require('bcryptjs');
app.post('/',function(req,res)
{
  let username=req.body.name;
  let password='12345';
  var hash = bcrypt.hashSync(password,10);
  // console.log(username,email,password,hash);
    model.roletable.findOne({where:{roletype:'user'}})
    .then(data=>{
      console.log(data.dataValues.id)
      let roledataid=data.dataValues.id;
      model.userdetails.create({username:username,password:hash,roletableId:roledataid})
          .then(result => res.send("Signed Up Successfully"))
      
      .catch(err => res.send("Email already already exist"))
    
    });
  //   model.userdetails.findAll({
  //     where:{email:'sujith@gmail.com'},include:'roletable'
  // })
  //   .then((result)=>{
  //     res.send(result);
  //   })
    
    // model.role.findAll({
    //   include: [{
    //       model: model.userinfo,
    //       where: {
    //           roleid: 2
    //       }
    //   }]
    // }).then(function(data)
    // {
    //  console.log(data)
    //     // res.send("sad"+result)
       
    //   //  console.log(data[0].dataValues.userinfo)
      
    // })


   
 
 })
 
 module.exports=app;
