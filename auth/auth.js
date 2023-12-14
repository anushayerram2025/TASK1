const jwt = require('jsonwebtoken');
const secretKey="ddfnjkafjksdfjkbdfjbasjfdb";
const authenticateToken=function(req, res, next) {
    const token = req.headers['authorization'];
    console.log(token);
  console.log("OOOOOOOOOOOOOO");
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
  
      req.user = user;
      next();
    });
  } 
module.exports=authenticateToken;