//All the necessary modules
const jwt = require("jsonwebtoken"); //this will be used to generate signed token
const expressJwt = require("express-jwt");

//Importing the necessary models
const User = require("../models/user");

//Defining the controller
exports.signup = (req, res) => {
	console.log("Responding from the controllers/user");
	console.log(req.body);

	let newUser = new User(req.body);

	newUser.save(function (error, data) {
		console.log("Seeing the data and the error");
		console.log(data);
		console.log(error);

		if (error) {
			//return na likhle nicher part o execute hobe hoy if else use korte hobe or return likte hobe
			return res.status(400).json({ error });
		}

		//Not sending these parameters for safty reasons
		data.hashed_password = undefined;
		data.salt = undefined;

		res.json({ data });
	});
};

exports.signin = (req, res) => {
	//Find the user based on email
	const { email, password } = req.body;
	User.findOne({ email }, (error, user) => {
		//If the user is not found on the database
		if (error || !user) {
			return res
				.status(400)
				.json({ error: "User with that email doesn't exist" });
		}
		//If the user is found on the database

		//First check if the user provided the correct password or not
		if (!user.authenticate(password)) {
			return res.status(400).json({ error: "Email and Passowrd didn't match" });
		}
		//Generating a signed token
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

		//presist the token as t in the cookie with an expire date
		res.cookie("t", token, { expire: new Date() + 2 });

		//Return response with user and token to frontend client
		const { _id, name, email, role } = user;
		return res.json({ token, user: { _id, name, email, role } });
	});
};

exports.signout = (req, res) => {
	res.clearCookie("t");
	res.json({ message: "Signout Successful" });
};

exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	requestProperty: "auth",
	algorithms: ["HS256"],
});

exports.isAuth = (req, res, next) => {
	//If the first one is true then it will return the second one, If the second one is true it will return the third one.
	let user = req.profile && req.auth && req.profile._id == req.auth._id;
	//After achiving the user id from the req.profile and matching it with the parsed token id. If matches then the user is same otherwise another user with someone else's token is trying to log in.

	//the user will return true or false
	if (!user) {
		return res.status(403).json({
			error: "Access Denied",
		});
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		return res.status(403).json({
			error: "Admin Access Only",
		});
	}
	next();
};
