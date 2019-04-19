const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');
const config = require('../helper/config');

router.post('/register', function(req, res) {
  const { userName, password } = req.body;
  bcrypt.hash(password, 10).then((hash)=>{
    const user = new User({
      userName,
      password : hash
    });
    const promise = user.save();
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
  });

});

router.post('/authenticate', (req,res)=>{
  const { userName, password } = req.body;
  User.findOne({userName : userName},(err,user)=>{
    if(err)
      res.json(err);
    if(!user)
      res.json({
        status : -1,
        message : "authentication failed"
      });
      else{
        bcrypt.compare(password,user.password).then((result)=>{
            if(!result)
              res.json({
                status : -1,
                message : "authentication failed"
              });
            else
            {
              const token = jwt.sign({userName : user.userName}, config.secret_key, {
                expiresIn: "7d"
              });
              res.json({
                status: true,
                token
              });
            }
        });
      }

    
  })
});


module.exports = router;
