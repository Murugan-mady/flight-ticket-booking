const express=require("express");
const app=express();
const dotenv=require("dotenv");
const bodyparser=require("body-parser");
const path = require("path");
const connectDB = require('./server/database/connection.js');
const session = require('express-session');
const cookieparser = require('cookie-parser');
 

dotenv.config({path:"config.env"});
const PORT=process.env.PORT||8080;
connectDB();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view-engine', 'ejs');
app.use(cookieparser());
app.use(session({
    secret: 'express-airlines',
    resave: true,
    saveUninitialized: true
}));


app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/images")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

app.use("/", require('./server/routes/router.js'));

app.listen(PORT);