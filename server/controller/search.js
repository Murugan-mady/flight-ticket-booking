const routes = require('../model/routes.js');
const bookings = require('../model/bookings.js');
exports.show = async function (req, res) {
    console.log("entered");
    const source = req.body.source;
    const dest = req.body.destination;
    const date = new Date(req.body.date);
    const time = req.body.time;
    const curr_date = new Date();
    const curr_time = curr_date.getHours() + ":" + curr_date.getMinutes();
    const mail = req.query.mail;

    if (isNaN(date)) { 
        res.send("Kindly select a valid date and time.");
        return;
    }

    if (curr_date.getFullYear() > date.getFullYear()) {
        res.send("Kindly select a valid date and time.");
        return;
    }
    if (curr_date.getMonth() > date.getMonth()) {
        res.send("Kindly select a valid date and time.");
        return;
    }
    if (curr_date.getDate() > date.getDate()) {
        res.send("Kindly select a valid date and time.");
        return;
    }
    if ((curr_date.getDate() == date.getDate() && curr_time > time)) {
        res.send("Kindly select a valid date and time.");
        return;
    }
    if (source == dest) {
        res.send("Kindly enter correct source and destination");
        return;
    }
    try {
        var result =await find_results(source, dest, date, time);
        if (result.length > 0) {

            res.render("show.ejs", { title: "Express Airlines", css: "/css/show.css", js: "", message: "Below are the results", table: result, mail: mail, source: source, destination: dest, date: date.toISOString() });
            return;
        }
        else {
            res.render("show.ejs", { title: "Express Airlines", css: "/css/show.css", js: "", message: "Sorry! No result found.", table: result, mail: mail, source: source, destination: dest, date: date.toISOString() });
            return;
        }
    }
    catch (err) {
        console.log(err);
    }
};

async function find_results(source, dest, date,time) { 
    var result = [];
    var row=[];
    try {
        row = await routes.find();
        for (let i = 0; i < row.length; i++){
            detail = row[i];
            console.log("entered row loop");
            var src = false;
            var diff = 0;
            let sr_indx = -1;
            for (let i = 0; i < (detail.route).length; i++) {
                if (src == false && detail.route[i] == source && detail.departure[i] >= time) {
                    src = true;
                    sr_indx = i;
                    var arr = (detail.departure[i]).split(":");
                    diff = arr[0];
                }
                else if (src == true && detail.route[i] == dest) {
                    try {
                        let seats = await count_seats(detail.flight, detail.route, date, sr_indx);

                        console.log(seats+" row loop");
                        if (seats > 0) {
                            data = [];
                            data['flight'] = detail.flight;
                            data['departure'] = detail.departure[sr_indx];
                            data['seats'] = String(seats);
                            var arr2 = (detail.departure[i]).split(":");
                            diff = arr2[0] - diff - 1;
                            data['reach'] = diff;
                            result.push(data);
                        }

                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            }
        }
        return result;
    }
    catch (err) {
        console.log(err);
        return result;
    }
    
}

async function count_seats(flight, route, date, sr_indx) {
    let count = 0;
    let seats = 60;
    var booked=[];
    try {
         booked =await bookings.find({
            flight: String(flight), date: date
         }).exec();
        for (let j = 0; j < booked.length; j++) {
            if (route.indexOf(booked[j].destination) <= sr_indx) { --count; }
            else { ++count; }
        }
        seats = seats - count;
        console.log(seats);
        return seats;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
    
}