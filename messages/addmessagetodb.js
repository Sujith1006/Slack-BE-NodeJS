let express = require("express");
let app = express.Router();
let models = require("../models");
let count = 0;
let Op = require("sequelize").Op;
class Addmessage {
    static async Addmeg(message) {
     let objmsg=message.messages
    // console.log("saddd",objmsg)
     models.userdetails
      .findOne({ Attributes: ["id"], where: { username: message.from } })
      .then(data => {
        let senderid = data.dataValues.id;
        
        models.userdetails
          .findOne({ Attributes: ["id"], where: { username: message.to } })
          .then(data => {
              // console.log('new11')
            let recieverid = data.dataValues.id;
            //  console.log(senderid,recieverid,req.body.message)
            models.messagetable
              .findAll({
                where: {
                  senderId: senderid, recieverId: recieverid 
                  
                }
              })
              .then(result => {
                // rid=result[0];
                // console.log('new')
              
                
                if (result[0] === undefined) 
                {
                  models.messagetable
                    .create({
                        
                      messages:objmsg,
                      messagecount: count + 1,
                      senderId: senderid,
                      recieverId: recieverid,
                      deleteindex:message.deletedindex
                    
                    })
                    .then(result => {
                      console.log("Insertion done");
                    });
                } else {
                  models.messagetable
                    .findOne({
                      attributes: ["messagecount"],
                      where: {
                    
                           senderId: senderid, recieverId: recieverid 
                       
                        
                      }
                    })
                    .then(async(datamsg) => {
                      let msgcount = datamsg.messagecount;
                        // console.log(,"bg");
                      await models.messagetable.update(
                        {
                          messages:objmsg,
                          messagecount: msgcount + 1,
                          deleteindex:message.deletedindex

                        },
                        {
                          where: {
                            
                              senderId: senderid, recieverId: recieverid 
                             
                          }
                        }
                      );
                 
                    
                    
                    });
                }
              });
          });
      });


      
    //     models.messagetable.findAll()
    //     .then(data=>console.log(data))
    
                   


  }
}
module.exports=Addmessage;
