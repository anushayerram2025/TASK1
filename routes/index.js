var express = require('express');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const authenticateToken=require('./auth.js');
var router=express.Router();
/* GET home page. */
router.get('/login',function(req,res){
  res.render('login')
});
router.get('/register',function(req,res){
  /*rendering the resgister page*/
  res.render('register')
})
router.post('/login',function(req,res){

  const user=Model.find({Username:req.username});
  const hash=user.password;
  const Entered_password=req.body.password;
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