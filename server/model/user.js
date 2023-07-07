const mongoose = require('mongoose');
var schema =new mongoose.Schema({
    name:String,
    mail: String,
    password: String
    });

const Userdb = mongoose.model('users', schema);
module.exports = Userdb;
