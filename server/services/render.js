const airports = require('../model/airports.js');
const bookings = require('../model/bookings.js');
const users = require('../model/user.js');
exports.homeRoutes = function (req, res) {
	var title = "Express Airlines";
	var css = "/css/styles.css"
	var js = "";
	res.render('index.ejs', { title: title, css: css, js: js });
};

exports.login = function (req, res) {
	var title = "Login";
	var css = "/css/login.css";
	var js = "";
	var message = "";
	res.render('login.ejs', { title: title, css: css, js: js,message:message });

}

exports.sign_up = function (req, res) {
	var title = "Sign Up";
	var css = "/css/sign_up.css";
	var js = "";
	var message = "";
	res.render('sign_up.ejs', { title: title, css: css, js: js ,message:message});
}

exports.search = function (req, res) {
	if (!req.session.data) {
		res.redirect('/');
		return;
	}
	airports.find().then(array => {
		const message = req.query.message || "Enter details to search flights";
		res.render("search.ejs", { title: "Express Airlines", css: "/css/search.css", js: "", airports: array, mail: req.query.mail, booked_message: message});
		}).catch(err => {
			console.log(err);
			res.send("some error occured!");
		});
	
}

exports.bookings = function (req, res) {
	if (!req.session.data) {
		res.redirect('/');
		return;
	}
	console.log("entered bookings");
	bookings.find({ mail: String(req.query.mail) }).then(record => {
		var result = [];
		var data;
		var msg = 'No bookings found!';
		record.forEach(row => {
			data = [];
			data['flight'] = row.flight;
			data['source'] = row.source;
			data['destination'] = row.destination;
			data['date'] = row.date.getDate() + "/" +( row.date.getMonth()+1)+ "/" + row.date.getFullYear();
			data['booked_date'] = row.booked_date.getDate() + "/" +( row.booked_date.getMonth()+1) + "/" + row.booked_date.getFullYear();				;
			data['departure'] = row.departure;
			result.push(data);
		});
		if (result.length > 0) { msg='Your bookings are:' }
		res.render('bookings.ejs', { table: result, title: "Express Airlines", css: "bookings.css", js: "", message: msg });
	}).catch(err => {console.log(err) });
}

exports.book = function (req, res) {
	if (!req.session.data) { 
		res.redirect('/');
		return;
	}
	const mail =String( req.body.mail);
	const source = String(req.body.source);
	const destination = String(req.body.destination);
	const flight = String(req.body.flight);
	const date = new Date(req.body.date);
	const departure = String(req.body.departure);
	const bdate = new Date();
	console.log("flight " + flight);
	console.log("date " + date);
	console.log("source:" + source);
	
	users.findOne({ mail: mail }).then(name => {
		var entry = new bookings({ mail: mail, source: source, destination: destination, date: date, name: name.name, booked_date: bdate, departure: departure, flight: flight });
		entry.save().then(savedentry => {
			var msg = 'Flight booked successfully';
			res.redirect('/login/success?&message=' + msg+'&mail='+mail);
		}).catch(err => { console.log(err); });
	}).catch(err => { console.log(err); });

}

exports.logout = function (req, res) {
	req.session.destroy(function (error) {
		if (error) { 
			console.log(error);
			return;
		}
		console.log("Session Destroyed")
	});
	res.redirect('/');
}