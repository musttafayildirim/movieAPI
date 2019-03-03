const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    category: String,
    country : String,
    year : {
        type : Number,
        max: 2039,
        min: 1900
    },
    imdb_score: Number,
    createdAt : {
        type: Date,
        default: Date.now
    }

});
5
module.exports = mongoose.model('movie', MovieSchema);