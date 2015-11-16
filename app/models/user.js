var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

	var socialSchema = new Schema({ 
		provider: String, 
		id: String,
		username: String, 
		email: String, 
		photo: String,
		token: String
	});

	var waveSchema = new Schema({
		image: String,
		wave: String,
		theme: String,
		city: String,
		tags: [String]
	});		


	var postSchema = new Schema({
		photo: String,
		username: String,
		content: String,
		comments: [{
			userId:Number,
			comment: String,
			created_at: {type: Date, default: Date.now}
		}],
		created_at: {type: Date, default: Date.now}
	});

	var favoriteSchema = new Schema({
		username: String,
		content: String,
		created_at: {type: Date, default: Date.now}
	});

	var notificationFriendSchema = new Schema({
		userId: Number,
		created_at: {type: Date, default: Date.now}
	});

	var friendSchema = new Schema({
		listFriends:[Number]
	});

	var userSchema = new Schema({
		photo: String,
		username: String,
		email: String,
		password: String,
		biography: String,
		birthday: {
				day: Number,
				month: Number,
				year: Number
			},

		waves: 	   [waveSchema],
		posts: 	   [postSchema],
		favorites: [favoriteSchema],
		socials:   [socialSchema],
		friends:   [friendSchema]		
		
	}, {timestamps: {createdAt: 'created_at'}});

	userSchema.methods.hashPassword = function(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync());
	};

	userSchema.methods.validatePassword = function(password){
		return bcrypt.compareSync(password, this.password);
	};

	module.exports = mongoose.model("Users", userSchema);