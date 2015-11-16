var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/user');
var config = require('../auth/config');


var twitterInit = function(req, token, tokenSecret, profile, callback){
	
	var socialData = {
		provider: profile.provider,
		id: profile.id,
		username: profile.displayName,
		email: req.user.email,
		photo: profile.photos[0].value,
		token: token
	}
	
	User.findOne({'email': socialData.email}, function(err, existingUser){
		if(err){
			return callback(err);
		}

		if(existingUser){
			for(var i = 0; i < existingUser.socials.length; i++){
				if(existingUser.socials[i].provider == 'twitter'){
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
			
			user.username = socialData.username,
			user.email = socialData.email,
			user.photo = socialData.photo
			
			user.socials.push(socialData);

			user.save(function(err){
				if(err)	throw err;
				return callback(null, user);	
			});	
		};
	});
};

passport.use(new TwitterStrategy(config.twitter, twitterInit));

passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	User.findById(id, function(err, user){
		callback(err, user);
	});
});

module.exports = {
	twitter: {
		login: passport.authenticate('twitter', {scope: ['email']}),
		callback: passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/auth'
		}),
		connect: passport.authorize('twitter', {scope: ['email']}),
		connectCallback: passport.authorize('twitter', {
			successRedirect: '/',
			failureRedirect: '/'
		}),
		disconnect: function(req, res, next){
			var userid = req.user.id;
			
			User.findById(userid, function(err, user){
				
				for(var i = 0; i < user.socials.length; i++){
					if(user.socials[i].provider == 'twitter'){
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