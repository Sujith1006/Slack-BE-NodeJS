let express=require('express');
let app=express.Router();
let model=require("../models")
let Op=require('sequelize').Op
app.post('/',(req,res)=>{
    console.log("safgsdg",req.body.reciever,req.body.sender)
    if(req.body.reciever!=undefined)
    {

    let senderid=req.body.sender;

    model.userdetails
.findOne({attributes:['id','username'],where:{username:req.body.reciever}})
    .then(data=>{
        // console.log(data)
         let recieverid=data.dataValues.id;
            // console.log(senderid,recieverid)
            // res.send(data)
            
            model.messagetable.findAll({attributes:['messages','senderId','deleteindex','bg_color'],where:{
            [Op.or]:[
            {recieverId:recieverid,senderId:senderid},{recieverId:senderid,senderId:recieverid}]


            },
            include:[{model:model.userdetails,as:'sender',attributes:['username']}]
    }  )
         .then(msg=>{
            //  console.log(msg[0].dataValues.bg_color,msg[1].dataValues.bg_color)
       

             let del,arr=[],arr1=[],colorsender,colorreciever;
             if(msg[0]==undefined)
             {
                    colorsender=msg[1].dataValues.bg_color
                del=msg[1].dataValues.deleteindex
                 msg[1].dataValues.messages.map(Element=>{
                    
                    let ele=JSON.parse(Element)
                    arr1.push(ele)
                    msg[1].dataValues.messages=arr1;
                        
                })
              
                // console.log("msg1")
             }
             else if(msg[1]==undefined)
             {
                colorreciever=msg[0].dataValues.bg_color

                 del=msg[0].dataValues.deleteindex
                 msg[0].dataValues.messages.map(Element=>{
                    let ele=JSON.parse(Element)
                    arr.push(ele)


                })
                msg[0].dataValues.messages=arr;
              
                // console.log("msg2",msg[0].dataValues.messages)

             }
             else{
                //  console.log("object")
                msg[0].dataValues.messages.map(Element=>{
                     let ele=JSON.parse(Element)
                     arr.push(ele)
                    

                })
                msg[0].dataValues.messages=arr;
                   
                msg[1].dataValues.messages.map(Element=>{
                    let ele=JSON.parse(Element)
                    arr1.push(ele)
                })
                msg[1].dataValues.messages=arr1;
                colorreciever=msg[0].dataValues.bg_color
                colorsender=msg[1].dataValues.bg_color
                del=msg[1].dataValues.deleteindex.concat(msg[0].dataValues.deleteindex)
    //  console.log("msg3",msg[0].dataValues.messages)

             }
                
             if(msg.length<1)
             {
                 res.send('nopo');
             }
             else{
                 let obj;
                 if(msg.length==1)
                 {
                        obj={msg1:msg[0].dataValues,msg2:[],del:msg[0].dataValues.deleteindex}
                 }
                 else{
                     obj={
                        msg1:msg[0].dataValues,
                        msg2:msg[1].dataValues,
                        del:del,
                       
                    }
                }
                
                // console.log("Object",(msg[0].dataValues.messages,msg[1].dataValues.messages))

                res.send(obj)
             }
           
        })
        })
    }
    else{
        // console.log('oanfonfo');
    }
})

module.exports=app;