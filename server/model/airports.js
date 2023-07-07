const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    code: String,
    name: String
});
const places = mongoose.model('airports', schema);
module.exports = places;