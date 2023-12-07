var express = require('express');
var router = express.Router();
const db = require('./Model');

const bcrypt = require("bcrypt")


function createHashpass(password){
  const saltRounds=10;
  const password=req.body.password;
  const hash=bcrypt.hash(password,saltRounds)
  return hash;
}

/* GET users listing. */
router.get('/AllUserList', async function(req, res, next) {
    const users=await db.find({});
    console.log(users);
});

router.get('/deleteUser',async function(req,res){
    const username=req.body.username;
    await db.findOneAndUpdate({Username:username},{soft_delete:True});
})

router.get('/UpdateDetails',async function(req,res){
   const {name,username,pass_word,phone}=req.body;
   const user=db.findOneAndUpdate({Username:username},{Name:name,password:pass_word,phone_no:phone});

})

router.get('/save',async function(req,res){
  const hash=createHashpass(req.body.password);
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