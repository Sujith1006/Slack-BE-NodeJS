var models = require("../models");
let Op=require('sequelize').Op
class Read{
    static async Msg(name){
        // console.log("read",data.sender,)
        models.userdetails
        .findOne({ Attributes: ["id"], where: { username: name.sender } })
        .then(data => {
          let senderid = data.dataValues.id;
          
          models.userdetails
            .findOne({ Attributes: ["id"], where: { username: name.reciever } })
            .then(data => {

              let recieverid = data.dataValues.id;
            //   console.log(senderid,recieverid)
            models.messagetable.update({
                bg_color:name.bgcolor},
              {where:{recieverId:recieverid,senderId:senderid}
        
      }  )
            .then(data=>{console.log(data)})
            })
        })
    }
}

module.exports=Read;