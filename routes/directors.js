const express = require('express');
const router = express.Router();

const Director = require('../models/Director');

router.get('/GetAll', function(req, res) {
  const promise = Director.find({});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.post('/Add',(req,res)=>{
 
  const { firstName, lastName, bio } = req.body;
  const director = new Director({
    firstName : firstName,
    lastName : lastName,
    bio : bio
  });

  const promise = director.save();
	promise.then((data) => {
		res.json({
      status :1
    });
	}).catch((err) => {
		res.json(err);
	});
});

router.get('/GetDetail/:id',(req,res)=>{
    const promise = Director.findById(req.params.id);
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
  });
  
  router.put('/Update/:id',(req,res)=>{
    const promise = Director.findByIdAndUpdate(req.params.id,req.body, {new : true});
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
  });
  
  router.delete('/Delete/:id',(req,res)=>{
    const promise = Director.findByIdAndRemove(req.params.id);
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
  });

module.exports = router;
