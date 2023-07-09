const express = require('express');
const route = express.Router();
const services = require('../services/render.js');
const user = require('../controller/user.js');
const search = require('../controller/search.js');

route.get("/", services.homeRoutes);

route.get("/login", services.login);
route.get("/sign_up", services.sign_up);

route.get('/login/success', services.search);
route.get('/logout', services.logout);
route.get('/login/search/bookings', services.bookings);

route.post('/login/search/book', services.book);

route.post('/login', user.validate);
route.post('/sign_up', user.create);

route.post('/login/success', search.show);

module.exports = route;