let model=require("../models")
class Channelmessage{
   static  async Channelmsg(data)
    {       
            console.log(data)
          let sender= await model.userdetails.findOne({attributes:['id'],where:{username:data.from}})
          let channel= await model.channellist.findOne({attributes:['id'],where:{name:'#'+data.channelname}})
          model.channelmessage.findOne({where:{channelId:channel.dataValues.id,userId:sender.dataValues.id}})
          .then(res=>{
              if(res===null)
              {
                  model.channelmessage.create({
                      messages:data.messages,
                      channelId:channel.dataValues.id,
                      userId:sender.dataValues.id

                  })
              }
              else
              {
                  model.channelmessage.update({
                      messages:data.messages},{where:{userId:sender.dataValues.id,channelId:channel.dataValues.id}
                   } )
              }
          })
        
            
    }

}
module.exports=Channelmessage