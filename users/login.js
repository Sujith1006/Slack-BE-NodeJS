let express = require("express");
let jwt = require("jsonwebtoken");
let app = express.Router();
let model = require("../models");
let bcrypt = require("bcryptjs");

app.post("/", function(req, res) {
  // console.log('dbslbflsbfl',req)
  let signedname = req.body.signedname;
  let signedpass = req.body.signedpass;
  // console.log('dd',req.body.signedpass,signedname)

  model.userdetails
    .findOne({ where: { username: signedname } })
    .then(function(data) {
       console.log(data)

      if (data.dataValues) {
        // console.log(data.dataValues.id);

        bcrypt.compare(signedpass, data.dataValues.password, function(
          err,
          result
        ) {
          // console.log(result)
          if (result) {
            // console.log(data[0].dataValues);
            // let arr=[{userloggedin:data[0].username,userloggedmail:data[0].email}]
            // res.send(arr)
            // console.log(data)

            model.roletable
              .findAll({
                where: { id:data.dataValues.roletableId}
              })
              .then(role => {
                // console.log(role[0].dataValues.roletype)
                // console.log(role.dataValues.roleid)
                let details = {
                  id: data.dataValues.id,
                  username: data.dataValues.username,
                  role: role[0].dataValues.roletype
                };
                console.log(details)
                // let token = jwt.sign({ details }, "sujith", {
                //   expiresIn: 86400
                // });
                // console.log(token);

                res.send(details);
              });
          } else {
            res.status(401).send({ Auth: false });
          }
        });
      } else {
        res.status(401).send("Invalid Username");
      }
      // let arr=[{userloggedin:data[0].username,userloggedmail:data[0].email}]
      // res.send(arr)
    });
});

module.exports = app;
