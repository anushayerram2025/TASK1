var express = require('express');
var router = express.Router();
const db = require('../Models/Model.js');

const bcrypt = require("bcrypt")


function createHashpass(password){
  const saltRounds=10;
  const hash=bcrypt.hash(password,saltRounds)
  return hash;
}

/* GET users listing. */
router.get('/AllUserList', async function(req, res, next) {
    const users=await db.find({});
    console.log(users);
    res.send("HEYY");
});

router.get('/deleteUser',async function(req,res){
    const username=req.body.username;
    await db.findOneAndUpdate({Username:username},{soft_delete:true});
    res.send("DELETED");
})

router.get('/UpdateDetails',async function(req,res){
   const {name,username,pass_word,phone}=req.body;
   const user= await db.findOneAndUpdate({Username:username},{Name:name,password:pass_word,phone_no:phone});

})

router.post('/save',async function(req,res){
  const hash=String( await createHashpass(req.body.password));
  const user= await db.create({
    Name:req.body.name,
    Username:req.body.username,
    password:hash,
    phone_no:req.body.phone_no
})
res.send("SAVED!!!")
})
module.exports = router;
/*
#user details
These are POST ROUTES
/deleteUser(soft delete)
/getAllUsers
/UpdateUser..but on what based? 

*/

