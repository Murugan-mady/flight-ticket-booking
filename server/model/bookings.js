const mongoose = require('mongoose');
var schema = new mongoose.Schema({ 
    name: String,
    mail: String,
    flight: String,
    booked_date: Date,
    date: Date,
    source: String,
    destination: String,
    departure: String
});
const bookings = mongoose.model('bookings', schema);
module.exports =bookings;