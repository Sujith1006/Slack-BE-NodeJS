var express=require('express');
var router = express.Router();
router.use('/signup',require('./signup'));
router.use('/login',require('./login'));
router.use('/update', require('./update'))
router.use('/addtodb',require('../messages/addmessagetodb'))
router.use('/userlistfetch',require('../users/userlistfetch'))

module.exports=router;

