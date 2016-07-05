var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DataSchema = new Schema({
    talkId : { type: Number,},
    sentence: { type: String },
    sentenceId: { type: Number }
});
module.exports = mongoose.model('Data', DataSchema);