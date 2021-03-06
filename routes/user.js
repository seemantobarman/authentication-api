const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/secret/:userId", requireSignin, isAuth, (req, res) => {
	res.json({
		user: req.profile,
	});
});

router.get("/admin/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
	res.json({
		message: "Admin Access Granted",
		user: req.profile,
	});
});
//
router.param("userId", userById);

module.exports = router;
