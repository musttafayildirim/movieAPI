const express = require('express');
const router = express.Router();


//Modelleri buraya yazıyoruz...
const Movie = require('../models/Movie');

// tüm filmleri listeletmek için kullandığımız yapı...
router.get('/',(req, res)=> {
  const promise = Movie.find({ });

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});


//top10 listesi
router.get('/top10',(req, res)=> {
  const promise = Movie.find({ }).limit(10).sort({imdb_score: -1});

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});




// belli bir id değerine sahip olan filmleri döndürmek için
router.get('/:movie_id', (req, res, next) =>{
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    res.json(movie);
  }).catch((err) => {
    //burada eğer film bulunamadıysa onu yazdırdık...
    if(err) {
      next({message: 'İlgili film bulunamadı..'});
    }
    res.json(err);
  });
});


//film güncelleme
router.put('/:movie_id', (req, res, next) =>{
  const promise = Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
      {
        new : true
      }
  );

  promise.then((movie) => {
    res.json(movie);
  }).catch((err) => {
    //burada eğer film bulunamadıysa onu yazdırdık...
    if(err) {
      next({message: 'İlgili film bulunamadı..'});
    }
    res.json(err);
  });
});


//film silme
router.delete('/:movie_id', (req, res, next) =>{
  const promise = Movie.findByIdAndRemove(
      req.params.movie_id,
  );

  promise.then((movie) => {
    if(!movie) {
      next({message: 'İlgili film bulunamadı..'});
    }
    res.json({status : 1});
  }).catch((err) => {
    //burada eğer film bulunamadıysa onu yazdırdık...

    res.json(err);
  });
});


//iki tarihin arasındaki filmeleri çekme
router.get('/between/:start_year/:end_year',(req, res)=> {
  const {start_year, end_year} = req.params;
  const promise = Movie.find(
      {
        year: {"$gte": parseInt(start_year), "$lte": end_year}
      }
  );

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});


//film ekleme
router.post('/', (req, res, next) => {
  /*
  const { title, imdb_score, category, country, year } = req.body;

  const movie = new Movie({
    title : title,
    imdb_score : imdb_score,
    category: category,
    country: country,
    year: year
  });
*/ //bu şekilde de tanımlama yapabiliriz yukarıdaki tanımlama daha spesifiktir...

  const movie = new Movie(req.body);


/*
  movie.save((err, data) => {
    if(err)
      res.json(err);
    res.json(data);
  });
*/
  //dbye eklediğimiz promise yapısı sayesinde böyle temiz bir kodda yazabiliriz ve yaptıkları şey aynıdır...
  const promise = movie.save();
  promise.then((data) => {
    res.json({status : 1});
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
