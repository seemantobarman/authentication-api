//All necessary modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

//All the enviornment variables
require("dotenv").config();

//Defining the app
const app = express();

//Importing all the routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

//Connecting to the database
DATABASE = process.env.DATABASE;
mongoose
	.connect(DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(function () {
		console.log("Database Connected to ecommerceDB");
	});

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//All the routes middleware
app.use("/api", authRoute);
app.use("/api", userRoute);

// Error Message Handeling (Global Error Handeler)
app.use(function (error, req, res, next) {
	if (error.name === "UnauthorizedError") {
		res.status(401).send({ message: error.message });
	}
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
