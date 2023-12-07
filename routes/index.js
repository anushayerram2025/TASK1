var express = require('express');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const authenticateToken=require('../auth/auth.js');
var router=express.Router();



function validPassword(Entered_password,hash){
  bcrypt
      .compare(Entered_password, hash)
      .then(res => {
        console.log(res) // return true
        if(res==='True'){
          // Generate a JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey);
        res.set('Authorization', `Bearer ${token}`);
          res.redirect('/profile/:username');
        }
      })
      .catch(err => console.error(err.message)) 
}

async function UserExists(username){
  const user=await Model.find({Username:req.username});
  if (user.soft_delete==False){
    return True
  }
  return False

}
/* GET home page. */
router.get('/login',function(req,res){
  res.render('login')
});
router.get('/register',function(req,res){
  /*rendering the resgister page*/
  res.render('register')
})
router.post('/login',function(req,res){
  /*autherntication*/
  /*password hashing adn checking*/
  
  if (UserExists(req.body.username)==True) {
    const hash=user.password;
    const Entered_password=req.body.password;
    validPassword(Entered_password,hash)
  }
  else{
    res.send("YOUR ACCOUNT IS DELETED");
  }
  
  
})
router.get('/profile/:username',authenticateToken,async function(req,res){
  const user=await Model.find({Username:req.params.username});
  console.log(user);
  res.send('LOGGED IN');
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