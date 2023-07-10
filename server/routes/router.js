const express = require('express');
const route = express.Router();
const services = require('../services/render.js');
const user = require('../controller/user.js');
const search = require('../controller/search.js');
const admin = require('../controller/admin.js');

route.get('/admin', services.admin);
route.post('/admin', admin.validate);
route.get('/admin/success', admin.operations);
route.post('/admin/add', admin.add);
route.post('/admin/delete', admin.delete);
route.post('/admin/view', admin.view);

route.get("/", services.homeRoutes);

route.get("/login", services.login);
route.get("/sign_up", services.sign_up);


route.get('/login/success', services.search);
route.get('/logout', services.logout);
route.get('/login/search/bookings', services.bookings);

route.post('/login', user.validate);
route.post('/sign_up', user.create);


route.post('/login/success', search.show);
route.post('/login/search/book', services.book);



module.exports = route;