const mongoose = require('mongoosse');
var schema = new mongoose.Schema({
    code: String,
    name: String
});
const flights = mongoose.model('flight', schema);
module.exports = flights;