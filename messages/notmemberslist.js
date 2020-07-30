let express = require("express");
let app = express.Router();
let Op=require('sequelize').Op
let models = require("../models");
app.post("/", (req, res) => {
    console.log(req.body)
  models.usersinchannel.findAll({
    attributes: ["userId"],
    where:{channelId:req.body.channel}
  })
  .then((result) => {
      let arr=[]
      console.log(result)
      result.map((ele)=>{
          console.log(ele.dataValues.userId)
          arr.push(ele.dataValues.userId)
      })
      models.userdetails.findAll({ attributes:['username'],where:{id:{
          [Op.not]:arr}
      }})
      .then((data)=>
      {     console.log(data)
          res.send(data)
      })
      
      
  })
});
module.exports = app;
