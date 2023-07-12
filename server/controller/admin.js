const admins = require('../model/admin.js');
const airports = require('../model/airports.js');
const routes = require('../model/routes.js');
const flights = require('../model/flights.js');
const bookings = require('../model/bookings.js');
const { data } = require('../../node_modules/cheerio/lib/api/attributes.js');
exports.validate = function (req, res) {
    var mail = req.body.mail;
    var pwd = req.body.password;
    console.log('admin:' + mail);
    console.log('password ' + pwd);
    admins.findOne({mail:mail}).exec().then(credential => {
        console.log(credential);
        if (credential.password == String(pwd)) {
            req.session.data = mail;
            res.redirect('/admin/success');
            return;
        }
        else {
            res.send("Invalid Credentials");
            return;
        }
    }).catch(err => { console.log(err) });
};

exports.operations = function (req, res) {
    if (!req.session.data) {
        res.redirect('/admin');
        return;
    }
    res.render('admin_operations.ejs', {title:"Express Admin",css:'/css/admin_operations.css',js:'/js/admin_operations.js'});
};

exports.add = function (req, res) {
    const code = req.body.code;
    const name = req.body.name;
    const departure = req.body.time;
    const airport = req.body.airport;
    flights.findOne({ code: code }).then(plane => {
        if (!plane) {
            const flight = new flights({ name: name, code: code });
            const route = new routes({ flight: code, route: airport, departure: departure });
            if (!save_record(flight) || !save_record(route)) {
                res.send('Error occured');
                return;
            }
            for (let i = 0; i < airport.length; i++) {
                var aports;
                airports.findOne({ code: airport[i].split('-')[0] }).then(data => {
                    if (!data) {
                        aports = new airports({
                            code: airport[i].split('-')[0],
                            name: airport[i].split('-')[1]
                        });
                        if (!save_record(aports)) {
                            res.send("Some error occured");
                            return;
                        }
                    }
                }).catch(err => { console.log(err) });
            }
            res.send('Flight added successfully');
        }
        else {
            res.send('Flight already exists');
            return;
        }
    }).catch(err => { console.log(); });



};

async function save_record(record) { 
    await record.save().then(saved => { 
        return true;
    }).catch(err => { console.log(err); });
    return false;
}

exports.delete = function (req, res) {
    var code = req.body.code;
    var curr_date = new Date();
    bookings.countDocuments({ code: code, date: { $gte: curr_date } }).then(count => {
        if (count == 0) {
            flights.findOneAndDelete({ code: code }).then(del => {
                if (!del) {
                    res.send('No flight exist');
                    return;
                }
                else {
                    routes.findOneAndDelete().then(rout => {
                        res.send('Deleted flight successfully');
                        return;
                    }).catch(err => { console.log(err); });
                }
            }).catch(err => { console.log(err); });
        }
        else { 
            res.send('Sorry,There are pending bookings on the flight.');
            return;
        }
    }).catch(err => { console.log(err); });
};


exports.view = function (req, res) {
    const flight = req.body.code;
    const sdate = req.body.strt_date;
    const edate = req.body.end_date;
    var result = [];
    var data = [];
    bookings.find({ flight: flight, date: {$gte:sdate,$lte:edate} }).then(booking => { 
        for (let i = 0; i < booking.length; i++) { 
            data = [];
            var d = booking[i].date;
            var bd = booking[i].booked_date;
            data['name'] = booking[i].name;
            data['mail'] = booking[i].mail;
            data['flight'] = booking[i].flight;
            data['date'] = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
            data['booked_date'] = bd.getDate() + "-" + (bd.getMonth()+1) + "-" + bd.getFullYear();
            data['departure'] = booking[i].departure;
            data['source'] = booking[i].source;
            data['destination'] = booking[i].destination;
            result.push(data);
        }
        if (result.length > 0) { 
            res.render('all_bookings.ejs', {table:result,title:'Express Admin',css:'/css/all_bookings.css',js:"",message:'Below are results of your query'});
        }
        else
            res.render('all_bookings.ejs', { table: result, title: 'Express Admin', css: '/css/all_bookings.css', js: "", message: 'No bookings found' });
        
    }).catch(err => {
        console.log(err);
    });
};