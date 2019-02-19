const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb+srv://admin:admin1234@cluster0-zeiy0.gcp.mongodb.net/movie-api?retryWrites=true',{useNewUrlParser: true});
    mongoose.connection.on('open', () =>{
        console.log('MongoDB Connected')
    });
    mongoose.connection.on('error', (err) =>{
        console.log('MongoDB Error', err)
    });
    //promise tanımlaması ekliyoruz..
    mongoose.Promise = global.Promise;
};