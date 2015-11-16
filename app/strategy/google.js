var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
var config = require('../auth/config');

var googleInit = function(req, token, tokenSecret, profile, callback){
	
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
				if(existingUser.socials[i].provider == 'google'){
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
				return callback(null, existingUser);	
			});	
		};
	});
};

passport.use(new GoogleStrategy(config.google, googleInit));

passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	User.findById(id, function(err, user){
		callback(err, user);
	});
});

module.exports = {
	google: {
		login: passport.authenticate('google', {scope: ['email']}),
		callback: passport.authenticate('google', {
			successRedirect: '/',
			failureRedirect: '/auth'
		}),
		connect: passport.authorize('google', {scope: ['email']}),
		connectCallback: passport.authorize('google', {
			successRedirect: '/',
			failureRedirect: '/'
		}),
		disconnect: function(req, res, next){
			var userid = req.user.id;
			
			User.findById(userid, function(err, user){
				
				for(var i = 0; i < user.socials.length; i++){
					if(user.socials[i].provider == 'google'){
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