import jwt from 'jsonwebtoken';

const authenticateToken=function(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = req.query.token || (authHeader && authHeader.split(' ')[1]);
  
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