const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

router.get('/GetAll', function(req, res) {
  const promise = Movie.find({});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.get('/GetAllDetail', function(req, res) {
  
  const promise = Movie.aggregate([
    {
      $lookup : {
        from : 'directors',
        localField : 'director_id',
        foreignField : '_id',
        as : 'director'
      }
    },
    {
        $unwind : '$director'
    }   
  ]);

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.post('/Add',(req,res)=>{
 
  const { title, imdb_score, category, country, year } = req.body;
  const movie = new Movie({
    title : title,
    category : category,
    country : country,
    imdb_score : imdb_score,
    year : year
  });

  const promise = movie.save();
	promise.then((data) => {
		res.json({
      status :1
    });
	}).catch((err) => {
		res.json(err);
	});
});

router.get('/GetDetail/:id',(req,res)=>{
  const promise = Movie.findById(req.params.id);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.put('/Update/:id',(req,res)=>{
  const promise = Movie.findByIdAndUpdate(req.params.id,req.body, {new : true});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.delete('/Delete/:id',(req,res)=>{
  const promise = Movie.findByIdAndRemove(req.params.id);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.get('/Top10', function(req, res) {
  const promise = Movie.find({}).limit(10).sort({imdb_score : -1});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.get('/Between/:startYear/:endYear', function(req, res) {
  const {startYear,endYear} = req.params;
  const promise = Movie.find({
    year : {"$gte" : parseInt(startYear),"$lte" : parseInt(endYear)}
  });
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

module.exports = router;
