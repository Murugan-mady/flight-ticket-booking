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
	var airports = require('../model/airports.js');
	airports.find().then(array => {
		res.render("search.ejs", { title: "Express Airlines", css: "/css/search.css", js: "", airports: array,mail:req.body.mail });
	}).catch(err => {
		console.log(err);
		res.send("some error occured!");
	});
	
}

exports.bookings = function (req, res) {
	var bookings = require('../model/bookings.js');
	bookings.find({ mail: req.body.mail }).then(record => {
		var result = [];
		var data;
		record.forEach(row => {
			data = [];
			data['flight'] = row.flight;
			data['source'] = row.source;
			data['destination'] = row.destination;
			data['date'] = row.date;
			data['booked_date'] = row.booked_date;
			data['departure'] = row.departure;
			result.push(data);
		});
		res.render('bookings.ejs', {table:result});
	}).catch(err => {console.log(err) });
}

exports.book = function (req, res) {
	var bookings = require('../model/bookings.js');
	const entry = new bookings({mail:req.body.mail,});
}
