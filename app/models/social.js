var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var socialProfile = new Schema({
		id: String,
		username: String,
		email: String,
		photo: String,
		provider: String,
		token: String
	});

var socialSchema = new Schema({
	social: [socialProfile],
	
	local: {
		username: String,
		email: String,
		password: String
	},
	facebook: {
		id: String,
		username: String,
		token: String
	},
	twitter: {
		id: String,
		username: String,
		token: String
	},
	google: {
		id: String,
		username: String,
		token: String
	},
	github: {
		id: String,
		username: String,
		token: String
	},
	linkedin: {
		id: String,
		username: String,
		token: String
	}

});

socialSchema.methods.hashPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

socialSchema.methods.validatePassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model("social", socialSchema);
