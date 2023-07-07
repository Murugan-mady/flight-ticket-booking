const express=require("express");
const app=express();
const dotenv=require("dotenv");
const morgan=require("morgan");
const bodyparser=require("body-parser");
const path = require("path");
const connectDB = require('./server/database/connection.js');
 

dotenv.config({path:"config.env"});
const PORT=process.env.PORT||8080;
app.use(morgan('tiny'));
connectDB();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view-engine','ejs');

app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/images")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

app.use("/", require('./server/routes/router.js'));

app.listen(PORT);