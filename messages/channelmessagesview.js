let express = require("express");
let app = express.Router();
let models = require("../models");
let arr=[],userslist=[]
app.post('/',(req,res)=>{
    let channelid=req.body.channelid+1
    models.userdetails.findOne({attributes:['id'],where:{username:req.body.username}})
    .then((data)=>{
        // console.log(data.dataValues.id)
        models.channellist.findOne({where:{id:channelid,creatorId:data.dataValues.id}})
        .then((ret)=>{
            console.log(ret)
            let creator=true;
            if(ret==null)
            {
                creator=false
          
        }
        
        models.usersinchannel.findOne({where:{channelId:channelid,userId:data.dataValues.id},include:[{model:models.roletable,as:"role"}]})
        .then((result)=>{
            let admin=false
            console.log(result)
            console.log(result.dataValues.role.dataValues.roletype)
            if(result.dataValues.role.dataValues.roletype==="admin"||result.dataValues.role.roletype==="creator")
            {
                admin=true
            }
            if(result!=null)
            {
                models.channelmessage.findAll({attributes:['messages'],where:{channelId:channelid}})
                .then(async(result) => {
                    result.map((ele)=>{
                                   
                                   ele.messages.map(data=>{
                                        // console.log(data)
                                    let parsed=JSON.parse(data)
                                    arr.push(parsed)
            
            
                                   })
                                // //  console.log(parsed)
                    })
                    // console.log("data")
                  let data=await models.usersinchannel.findAll({attributes:['userId'],where:{channelId:channelid},
                include:[{
                    model:models.userdetails,
                    as:'user',attributes:['username']
                 } ]
                })
                // console.log(data[0].dataValues.user.dataValues.username)
                        data.filter((ele)=>{
                            // console.log(ele.dataValues.user.dataValues.username)
                            userslist.push(ele.dataValues.user.dataValues.username)
                        })
                        let obj={
                            list:userslist,
                            messages:arr,
                            admin:admin,
                            creator:creator
                        }
                            userslist=[],
                            arr=[]
                            
                    res.send(obj)
                    
                })
            }
            else{
                res.send(role)
            }
        })
    })
})

    
})
module.exports=app