var app=require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyparser=require('body-parser')
var cors=require('cors');
var model=require('./models')
var add=require('./messages/addmessagetodb');
var color=require("./messages/read")
var read=require('./messages/read');
var channel=require("./messages/channelmessageinsert")
app.use(bodyparser.json());
app.use(cors())
server.listen(5000, function () {
  console.log('App listening')
})
model.userdetails.findAll({attributes:['username']})
.then(data=>
        data.map((user)=>{
// console.log(user.dataValues.username)
createSocket(user.dataValues.username)
}))

let sockets=[]
function  createSocket (e)
{
  if(!sockets[e]){
    var y=io.of(e) .on('connection', function (socket) {
      console.log('connection', e)
       socket.on('my other event', async(data)=>{
                JSON.stringify(data)
             await add.Addmeg(data);
             let status=data.messages[data.messages.length-1]
        // console.log('..........................',data,status);
     sockets[data.to].emit('reciever',{data:{message:data.meg,flag:data.options,
              key:data.key,delind:data.deletedindex,time:data.time,uid:data.uid,
              sender:data.sender,msgstatus:status.msgstatus,bgcolor:data.bgcolor}})
                                                });
              socket.on('bgcolor',async(data)=>
               {
                  // console.log(data)
                   await color.Msg(data);
              })
              // console.log(sockets)
              socket.on('channelmessage',async(data)=>{
                    console.log(data)
                   await channel.Channelmsg(data)
                   let status=data.messages[data.messages.length-1]
                    data.userslist.map((Element)=>{
                      if(data.from!=Element)
                      {
                     sockets[Element].emit('emitchanneltext',{messages:status,channel:true})
                      }
                   })
                   
                  
                  // console.log(sockets)

              })
    });
    sockets[e]=y
}    
        //  console.log("sad",sockets)
      }
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/user',require('./users/main'))
app.use('/messages',require('./messages/mainmessage'))
