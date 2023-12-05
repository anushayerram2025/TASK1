var express = require('express');
var router = express.Router();
const db = require('./Model');

const bcrypt = require("bcrypt")

/* GET users listing. */
router.get('/AllUserList', function(req, res, next) {
    const users=db.find({});
    console.log(users);
});

router.get('/deleteUser',function(req,res){
    const username=req.body.username;
    db.findOneAndUpdate({Username:username},{soft_delete:True});
})

router.get('/UpdateDetails',function(req,res){

})
router.get('/save',async function(req,res){
  
  const saltRounds=10;
  const password=req.body.password;
  const hash_pass=bcrypt.hash(password,saltRounds)
  const user= await Model.create({
    Name:req.name,
    Username:req.bodyusername,
    password:hash,
    phone_no:req.body.phone_no
})

})
module.exports = router;
/*
#user details
These are POST ROUTES
/deleteUser(soft delete)
/getAllUsers
/UpdateUser..but on what based? 

*/