

  const fetchProfile=function(req,res,next){
    console.log("HELLLOOOOOOOOOOOOOOOOOOOOOOO");
    console.log(req.user.Username,req.params.username);
    if (req.user.Username==req.params.username){
        next();
    }
    else{
        return res.sendStatus(401);

    }
    
  }
module.exports=fetchProfile