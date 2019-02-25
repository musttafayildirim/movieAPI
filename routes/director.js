const express = require('express');
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




module.exports = router;
