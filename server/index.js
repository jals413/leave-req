const express = require("express");
const config = require("./src/config/config");
const bodyParser = require("body-parser");
const {dbConnect,corsConnect} = require("./src/service");
const {errorMiddleware} = require("./src/middleware");

const connectApp = async () => {

	const app = express();

	//middleware
	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	//adding CORS
	app.use(corsConnect.corsConnect());

	//Routes

	app.use(errorMiddleware);

	//database connection
	try {
		await dbConnect.dbConnect();
	} catch (error) {
		console.log(error);
	}

	//server connection
	app.listen(config.PORT, () => {
		console.log(`Server running on port ${config.PORT}`);
	});
	
};

connectApp();