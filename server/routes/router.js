const express = require('express');
const route = express.Router();
const services = require('../services/render.js');
const user = require('../controller/user.js');
const search = require('../controller/search.js');
const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
	const secretKey = 'letmein';
	const token = req.query.token || req.headers.authorization?.split(' ')[1];;

	if (!token) {
		return res.redirect('/');
	}

	jwt.verify(token, secretKey, (err, mail) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid token' });
		}
		console.log(mail);
		req.mail = mail;
		req.token = token;
		next();
	});
}

route.get("/", services.homeRoutes);

route.get("/login", services.login);
route.get("/sign_up", services.sign_up);

route.get('/login/success',authenticateToken, services.search);
route.get('/login/search/my_bookings', authenticateToken,services.bookings);

route.post('/login/search/book', services.book);

route.post('/login', user.validate);
route.post('/sign_up', user.create);

route.post('/login/success', search.show);

module.exports = route;