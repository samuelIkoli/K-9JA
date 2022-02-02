
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});


ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const DogSchema = new Schema({
    name: String,
    age: String,
    description: [{
        type: String
    }],
    images: [ImageSchema]
});



module.exports = mongoose.model('Dog', DogSchema);