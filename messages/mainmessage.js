var express=require('express');
var router = express.Router();
router.use('/addmessagestodb',require('./addmessagetodb'))
router.use('/showmessage',require('./showmessage'))
router.use('/textmessages',require('./textmessgages'))
router.use('/dmmessages',require('./dmmessages'))
router.use('/deletecount',require('./deletecount'))
router.use('/channelmessages',require('./channelmessagesview'))
router.use('/notmemberslistfetch',require('./notmemberslist'))
router.use('/addnewtochannel',require('./addnewtochannel'))
router.use('/memberslistfetch',require('./memberslistfetch'))
router.use('/makeadminforchannel',require('./makeadminforchannel'))
router.use('/removefromchannel',require('./removefromchannel'))
router.use('/removeadminforchannel',require('./removefromadmin'))
router.use('/makecreator',require('./makecreator'))









module.exports=router;