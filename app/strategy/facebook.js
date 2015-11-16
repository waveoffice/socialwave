var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var config = require('../auth/config');

var facebookInit = function(req, token, tokenSecret, profile, callback){
	
	var socialData = {
		provider: profile.provider,
		id: profile.id,
		username: profile.displayName,
		email: profile.emails[0].value,
		photo: profile.photos[0].value,
		token: token
	}
	
	User.findOne({'email': socialData.email}, function(err, existingUser){
		if(err){
			return callback(err);
		}

		if(existingUser){
			for(var i = 0; i < existingUser.socials.length; i++){
				if(existingUser.socials[i].provider == 'facebook'){
					return callback(null, existingUser);
				}
			}

			existingUser.socials.push(socialData);

			existingUser.save(function(err){
				if(err)	throw err;
				return callback(null, existingUser);	
			});

		}else{
			var user = (req.user) ? req.user : new User();
			
			user.username = profile.displayName,
			user.email = profile.emails[0].value,
			user.photo = profile.photos[0].value
			
			user.socials.push(socialData);

			user.save(function(err){
				if(err)	throw err;
				return callback(null, user);	
			});	
		};
	});
};


passport.use(new FacebookStrategy(config.facebook, facebookInit));

passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	User.findById(id, function(err, user){
		callback(err, user);
	});
});

module.exports = {
	facebook: {
		login: passport.authenticate('facebook', {scope: ['email']}),
		callback: passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/auth'
		}),
		connect: passport.authorize('facebook'),
		connectCallback: passport.authorize('facebook', {
			successRedirect: '/',
			failureRedirect: '/'
		}),
		disconnect: function(req, res, next){
			var userid = req.user.id;
			
			User.findById(userid, function(err, user){
				
				for(var i = 0; i < user.socials.length; i++){
					if(user.socials[i].provider == 'facebook'){
						socialId = user.socials[i]._id;
						user.socials.id(socialId).remove();

						user.save(function(err){
							next();
						});
					}
				}
			});
		}
	}
};