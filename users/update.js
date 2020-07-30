let express=require('express')
let app = express.Router();
let model=require('../models')
let jwt=require('jsonwebtoken')
let bcrypt=require('bcryptjs')
let verify=require('./middleverify')


app.use('/info',verify,(req,res)=>
{
    let details=req.token;
     let rolename=details.details.role;

    if (rolename == 'user')
                {
                    let hashedpass=bcrypt.hashSync(req.body.newpassword,10)
                    model.userdetails.update( 
                        {
                            username:req.body.newusername,
                            password:hashedpass
                        },{where:{id:details.details.id}})
                        .then(result=>console.log(result))
                        res.send("User Details updated succesfully")
                }
                else{
                    res.send('Adminlogin')
                }
    }
    
)

module.exports=app