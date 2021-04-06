//Importing all the necessary modules
const express = require("express");
const router = express.Router();

//Importing all the controllers for the router
const {
	signup,
	signin,
	signout,
	requireSignin,
} = require("../controllers/auth");

//Importing the validator
const { userSignupValidator } = require("../validation/validator");

//Defining all the routers
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.get("/hello", requireSignin, (req, res) => {
	console.log(req);
	res.send("Hello There! :)");
});

//exporting the router
module.exports = router;
