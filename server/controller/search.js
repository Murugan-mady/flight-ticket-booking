const routes = require('../model/routes.js');
const bookings = require('../model/bookings.js');
exports.show = function (req, res) {
    console.log("entered");
    const source = req.body.source;
    const dest = req.body.destination;
    const date = (req.body.date).split("-");
    const time = req.body.time;
    const curr_date = new Date();
    const curr_time = curr_date.getHours() + ":" + curr_date.getMinutes();
    if (curr_date.getYear() > date[0]) {
        res.send("Kindly select a valid date and time.");
        return;
    }
    if (curr_date.getMonth() > date[1]) {
        res.send("Kindly select a valid date and time.");
        return;
    }
    if (curr_date.getDate() > date[2]) {
        res.send("Kindly select a valid date and time.");
        return;
    }
    if ((curr_date.getDate() == date[2] && curr_time > time)) {
        res.send("Kindly select a valid date and time.");
        return;
    }
    if (source == dest) {
        res.send("Kindly enter correct source and destination");
        return;
    }
    var result = [],data=[];
    routes.find().then(row => {
        row.forEach(function (detail) {
            var src = false;
            var diff = 0;
            for (let i = 0; i < (detail.route).length; i++) {

                if (detail.route[i] == source && detail.departure[i] >= time) {
                    src = true;
                    var arr = (detail.departure[i]).split(":");
                    diff = arr[0];
                }
                if (src == true && detail.route[i] == dest) {
                    var seats = 60;
                    bookings.find({ flight: detail.flight, date: date }).then(reserved => {
                        reserved.forEach(function (booked) {
                            if (booked.departure <= detail.departure[i]) { --seats; }
                            for (let j = 1; j <= i; j++) {
                                if (detail.route[j] == booked.destination) { ++seats; }
                            }
                        });
                    }).catch(err => { console.log(err); });
                    console.log("seats " + seats);
                    if (seats > 0) {
                        data = [];
                        data['flight'] = detail.flight;
                        data['departure'] = detail.departure[i];
                        data['seats'] = seats;
                        var arr2 = (detail.departure[i]).split(":");
                        diff = arr2[0] - diff;
                        data['reach'] = diff;
                        result.push(data);

                    }
                }
            }

        });
        if (result.length > 0) {
            res.render("show.ejs", { title: "Express Airlines", css: "/css/show.css", js: "", message: "Below are the results", table: result,mail:req.body.mail });
            return;
        }
        else {
            res.render("show.ejs", { title: "Express Airlines", css: "/css/show.css", js: "", message: "Sorry! No result found.", table: result,mail:req.body.mail });
            return;
        }
    }).catch(err => { console.log(err); });
};