const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
	},
	password: String,
	firstname: String,
	lastname: String,
	datecreated: Date,
	isverified: Boolean,
});

UserSchema.statics.findByEmail = async function (email) {
	let user = await this.findOne({
		email: email,
	});
	return user;
};

UserSchema.statics.deleteByEmail = function (email) {
	this.deleteOne({ email }, (err, res) => {});
};

module.exports = mongoose.model("User", UserSchema);