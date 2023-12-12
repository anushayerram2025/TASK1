var express = require('express');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const authenticateToken=require('../auth/auth.js');
var router=express.Router();
const UserModel = require('../Models/Model.js');

async function createHashpass(password){
  const saltRounds=10;
  const hash=await bcrypt.hash(password,saltRounds)
  return hash;
}

function validPassword(Entered_password,hash){
  bcrypt
      .compare(Entered_password, hash)
      .then(res => {
        console.log(res) // return true
        if(res==='True'){
          // Generate a JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey);

        return token;
        
        }
      })
      .catch(err => console.error(err.message)) 
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
  console.log(req.body);
  const passwordHash=String( await createHashpass(password));
  console.log(passwordHash)
  const user = await UserModel.findOne({Username:username});
  console.log(user);
  if (!user){
    throw new  Error("User is not found with given username");
    
  }
  else if (user.soft_delete){
    throw new Error("USER ACCOUNT DOESN'T exists");
  }
  console.log(passwordHash)
  const userPassword = await user.password;
  if (userPassword!=passwordHash){
    throw new Error("Wrong Password");
    
  }
  
    const token=validPassword(password,passwordHash)
    //res.set('Authorization', `Bearer ${token}`);
    //res.redirect('/profile/:username');
    res.json({token:token}); 
})
router.get('/profile/:username',authenticateToken,async function(req,res){
  const user=await Model.find({Username:req.params.username,soft_delete:false});
  if (!user){
    throw new Error('User is not found with given username');
  }
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