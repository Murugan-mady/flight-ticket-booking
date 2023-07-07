const mongoose = require('mongoose');
var schema = new mongoose.Schema({ 
    flight: String,
    route: [String],
    departure:[String]
});
const routes = mongoose.model('routes', schema);
module.exports = routes;