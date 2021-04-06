const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true, //Any space in the begining or at the end will be trimmed
			required: true,
			maxlength: 32,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: 32,
		},
		hashed_password: {
			type: String,
			required: true,
		},
		about: {
			type: String,
			trim: true,
		},
		salt: {
			type: String,
		},
		role: {
			type: Number,
			default: 0,
		},
		history: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

//virtual fields
userSchema
	.virtual("password")
	.set(function (password) {
		this._password = password;
		this.salt = uuidv4();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

//Adding Methods
userSchema.methods = {
	authenticate: function (plaintextPassowrd) {
		return this.encryptPassword(plaintextPassowrd) === this.hashed_password;
	},

	encryptPassword: function (password) {
		if (!password) {
			return "";
		} else {
			try {
				return crypto
					.createHmac("sha1", this.salt)
					.update(password)
					.digest("hex");
			} catch (error) {
				console.log(error);
				return "";
			}
		}
	},
};

module.exports = mongoose.model("User", userSchema, "users");
