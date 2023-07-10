const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    mail: String,
    password: String
});
const admin = mongoose.model('admin', schema,'admin');
module.exports = admin;