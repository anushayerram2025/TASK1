var express = require('express');
var router = express.Router();
const db = require('../Models/Model.js');

const bcrypt = require("bcrypt")
const authenticateToken=require('../auth/auth.js');
const fetchProfile=require('../auth/details.js');
function createHashpass(password){
  const saltRounds=10;
  const hash=bcrypt.hash(password,saltRounds)
  return hash;
}

/* GET users listing. */
router.get('/AllUserList/:username',authenticateToken,fetchProfile, async function(req, res, next) {
    console.log(req.user)
    if (req.user.role=='Admin'){
      const users=await db.find({});
      console.log(users);
      res.send("HEYY");
    }
    else{
      res.send(403);
    }
    
});

router.get('/:username/deleteUser',authenticateToken,fetchProfile,async function(req,res){
    const username=req.body.username;
    await db.findOneAndUpdate({Username:username},{soft_delete:true});
    res.send("DELETED");
})

router.get('/:username/UpdateDetails',authenticateToken,fetchProfile,async function(req,res){
  
   const user= await db.findOneAndUpdate({Username:req.body.username},{Name:req.body.name,password:String(await createHashpass(req.body.password)),phone_no:req.body.phone,role:req.body.role});
   console.log(user);

})

router.post('/save',async function(req,res){
  const hash=String( await createHashpass(req.body.password));
  const user= await db.create({
    Name:req.body.name,
    Username:req.body.username,
    password:hash,
    phone_no:req.body.phone_no,
    role:req.body.role
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

