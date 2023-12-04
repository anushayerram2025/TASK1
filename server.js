/*register api which lets user to register himself using email and password
Login using email and password
Send Forgot password (as of now send email otp in api response because cannot integrate emailing as of now)
Verify forgot password otp and update password which came in request body
Get all user list
Get a user details based on given id
Get my details which return details of logged in user
Update user details
Delete user (soft delete)*/

const express=require('express');
const Model = require('./Model');


const app=express();
app.use(express.json());             
app.use(express.urlencoded());
app.set('view engine','ejs');
app.get('/register',function(req,res){
        /*rendering the resgister page*/
        res.render('register')
})

app.post('/save',async function(req,res){
    /*save data from req to database*/
    const user= await Model.create({
        Name:req.name,
        Username:req.bodyusername,
        password:req.body.password,
        phone_no:req.body.phone_no
    })
    user.save();
    res.redirect('/login');
})
app.get('/login',function(req,res){
    res.render('login')
})
app.post('/login',function(req,res){
    /*autherntication*/
    /*password hashing adn checking*/
    const user=Model.find({Username:req.username,password:req.password});
    if (!user){
        return res.render('error',{
            error:'Invalid Username or Password'
        }) 
    }
    res.redirect('/profile/:username')/* only after authentication")*/
})
app.get('/profile/:username',async function(req,res){
    const user=await Model.find({Username:req.params.username});
    console.log(user);
    res.send('LOGGED IN');
}) 
app.post('/forgot',function(req,res){


    res.render('forgot',{password:34567});
})
app.post('/passUpdate',async function(req,res){
    console.log(req.body)
    const user_name=req.body.username
    const pass=req.body.password
    console.log(user_name);
    const  user= await Model.findOneAndUpdate({Username:user_name},{password:pass});
    console.log(user);
    res.redirect('/login');
})
app.listen(3000);


