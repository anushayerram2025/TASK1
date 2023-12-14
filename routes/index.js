var express = require('express');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const authenticateToken=require('../auth/auth.js');
var router=express.Router();
const UserModel = require('../Models/Model.js');
const fetchProfile=require('../auth/details.js');

const secretKey="ddfnjkafjksdfjkbdfjbasjfdb";
async function validPassword(Entered_password,hash,username){
  try {
    const res = await bcrypt.compare(Entered_password, hash);
    

    console.log(res); // should log true or false
    const user=await UserModel.findOne({Username:username});
    console.log(user);
    if (res) {
      // Assuming you have access to 'user' variable
      const token = jwt.sign({ Username: username,role: user.role}, secretKey);
      return token;
    }
  } catch (err) {
    console.error(err.message);
  }
}




/* GET home page. */
router.get('/login',function(req,res){
  /*res.render('login')*/
  res.send("LOGIN");
});
router.get('/register',function(req,res){
  /*rendering the resgister page*/
 /* res.render('register')*/
res.send("REGISTER")
})
router.post('/login',async function(req,res){
  /*autherntication*/
  /*password hashing adn checking*/
  const username=req.body.username;
  const password=req.body.password;
  
  const user = await UserModel.findOne({Username:username});
  console.log(user);
  if (!user){
    throw new  Error("User is not found with given username");
    
  }
  else if (user.soft_delete){
    throw new Error("USER ACCOUNT DOESN'T exists");
  }
  
    const token= await validPassword(password,user.password,username)
    //res.set('Authorization', `Bearer ${token}`);
    //res.redirect('/profile/:username');
    console.log(token);
    res.json({token:token}); 
    
})
router.get('/profile/:username',authenticateToken,fetchProfile,async function(req,res){
  const user=await UserModel.find({Username:req.params.username,soft_delete:false});
  if (!user){
    throw new Error('User is not found with given username');
  }
  console.log("openedddddddddd!!!!!!!!!!!")
  res.json(user);
})


module.exports = router;



/*
/login==> home page (if doesnot have account then /register..if forgot password then '/forgotpass)
/register==> redirect to /login (home)
/forgot ==> forgot password==> will update()
#user details
These are POST ROUTES
/deleteUser(soft delete)
/getAllUsers
/UpdateUser..but on what based? 

*/