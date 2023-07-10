const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    code: String,
    name: String
});
const flights = mongoose.model('flight', schema,'flight');
module.exports = flights;