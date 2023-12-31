const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const connectDB=function(){
	try
	{
		const con= mongoose.connect(process.env.MONGO_URI,{
			useNewUrlParser: true,
			useUnifiedTopology:true
		});
		console.log('Mongo DB connected ');
	}
	catch(err)
	{
		console.log(err);
		process.exit(1);
	}
}

module.exports=connectDB;