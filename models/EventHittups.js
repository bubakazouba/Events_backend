var mongoose  = require('mongoose');
var Schema  = mongoose.Schema;

var EventSchema = new Schema({
    title: String,
    duration: Number,
    dateStarts: Number,
    description: String,
    emoji: String,
    images: [{
      lowQualityImageurl: String,
      highQualityImageurl: String
    }],
    ownerName: String,
    imageurl: String,
    loc: { 
      type: { type: String },
      coordinates: [ ]// [<longitude>, <latitude>]
    },
}, {collection: 'EventHittups'});

EventSchema.index({ loc: '2dsphere' });
module.exports = mongoose.model('EventHittups', EventSchema);