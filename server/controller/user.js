var userdbs = require('../model/user.js');
// userdb operations : login and signup
exports.validate = function(req, res) {
    var mail = req.body.mail;
    var pwd = req.body.password;
    var title = "Login";
    var css = "/css/login.css";
    var js = "";
    if (mail == '') {
        res.render("login.ejs", { title: title, css: css, js: js, message: "" });
    }
    userdbs.findOne({ mail: mail }).then(user => { 
        if (user.password == String(pwd)) {
            res.redirect('/login/success');
            }
            else {
                res.render("login.ejs", { title: title, css: css, js: js, message: "Invalid password!" });
            }
        }).catch(err => {
            res.render("login.ejs", { title: title, css: css, js: js, message: "User not Found!" });
        });

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
                if (pwd!=pwd2) {
                    res.render("sign_up.ejs", { title: title, css: css, js: js, message: "Re-enter correct password!" });
                    return;
                }
                const new_usr = new userdbs({ name: name, mail: mail_id, password: pwd });
                new_usr.save().then(saveduser => {
                    airports.find().then(array => {
                        res.render("search.ejs", { title: "Express Airlines", css: "/css/search.css", js: js, airports: array });
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

