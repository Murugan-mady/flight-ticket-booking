var userdbs = require('../model/user.js');
const jwt = require('jsonwebtoken');
// userdb operations : login and signup
exports.validate = function(req, res) {
    var mail = req.body.mail;
    var pwd = req.body.password;
    var title = "Login";
    var css = "/css/login.css";
    var js = "";
    if (mail == '') {
        res.render("login.ejs", { title: title, css: css, js: js, message: "" });
        return;
    }
    else {
        userdbs.findOne({ mail: mail }).then(user => {
            if (user.password == String(pwd)) {
                var token = jwt.sign({ mail: mail ,exp:5}, 'letmein');
                res.redirect('/login/success?token='+token+'&mail='+mail);
                return;
            }
            else {
                res.render("login.ejs", { title: title, css: css, js: js, message: "Invalid password!" });
                return;
            }
        }).catch(err => {
            console.log(err);
            res.render("login.ejs", { title: title, css: css, js: js, message: "User not Found!" });
            return;
        });
    }

};

exports.create = function(req, res) {
    console.log("entered");
    const name = req.body.uname;
    var mail_id = req.body.mail;
    var pwd = req.body.password;
    const pwd2 = req.body.password2;
    var title = "Sign Up";
    var css = "/css/sign_up.css";
    var js = "";
    if (mail_id == '') {
        res.render("sign_up.ejs", { title: title, css: css, js: js, message: "" });
    }

    userdbs.findOne({ mail: mail_id }).then(user => {
        console.log("Mail : " + mail + " and record mail is " + user.mail);
        res.render("sign_up.ejs", { title: title, css: css, js: js, message: "Mail already exists!" });
    }).catch(err => {
        if (pwd != pwd2) {
                    res.render("sign_up.ejs", { title: title, css: css, js: js, message: "Re-enter correct password!" });
                    return;
                }
                const new_usr = new userdbs({ name: name, mail: mail_id, password: pwd });
                new_usr.save().then(saveduser => {
                    airports.find().then(array => {
                        var token = jwt.sign({ mail: mail_id,exp:5000}, 'letmein');
                        res.redirect('/login/success?token=' + token+'&mail='+mail_id);
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                    res.render("sign_up.ejs", { title: title, css: css, js: js, message: "Some error occured!" });
                    return;
                });
            });
    
    
    console.log("success");

};

