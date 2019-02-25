const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DirectorSchema = new Schema({
   name: String,
    surname: String,
    bio: String,
    createdAt: {
       type: Date,
        default: Date.now
    }

});
5
module.exports = mongoose.model('directors', DirectorSchema);