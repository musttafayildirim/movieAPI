const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


//modellerimizi sayfamıza dahil ediyoruz..
const Director = require('../models/Director');

router.post('/', (req, res) => {
 const director = new Director(req.body);
 const promise = director.save();

 promise.then((data) => {
   res.json(data);
 }).catch((err) =>{
   res.json(err);
 })
});


router.get('/', (req, res) =>{
    const promise = Director.aggregate([
        {
            $lookup: {
                from : 'movies',
                localField : '_id',
                foreignField : 'director_id',
                as : 'movie'
            }
        },
        {
            $unwind : {
                path : '$movie',
                //herhangi bir datayla eşleşmese bile veriyi döndürmeyi sağlayan sorgu....
                preserveNullAndEmptyArrays : true

            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname:  '$surname',
                    bio : '$bio'
                },
                movie :{
                    $push : '$movie'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movie : '$movie'
            }
        }

    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});


router.get('/:director_id', (req, res) =>{
    const promise = Director.aggregate([
        {
            $match: {
                '_id' : mongoose.Types.ObjectId(req.params.director_id)
            }
        },

        {
            $lookup: {
                from : 'movies',
                localField : '_id',
                foreignField : 'director_id',
                as : 'movie'
            }
        },
        {
            $unwind : {
                path : '$movie',
                //herhangi bir datayla eşleşmese bile veriyi döndürmeyi sağlayan sorgu....
                preserveNullAndEmptyArrays : true

            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname:  '$surname',
                    bio : '$bio'
                },
                movie :{
                    $push : '$movie'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movie : '$movie'
            }
        }

    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});



module.exports = router;
