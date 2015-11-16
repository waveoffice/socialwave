var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var User = require('../models/user');
var config = require('../auth/config');

var linkedinInit = function(req, token, tokenSecret, profile, callback){
	console.log(profile);
	var socialData = {
		provider: profile.provider,
		id: profile.id,
		username: profile.displayName,
		email: req.user.email,
		photo: req.user.photo,
		token: token
	}

	User.findOne({'email': socialData.email}, function(err, existingUser){
		if(err){
			return callback(err);
		}

		if(existingUser){
			for(var i = 0; i < existingUser.socials.length; i++){
				if(existingUser.socials[i].provider == 'linkedin'){
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

passport.use(new LinkedInStrategy(config.linkedin, linkedinInit));

passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	User.findById(id, function(err, user){
		callback(err, user);
	});
});

module.exports = {
	linkedin: {
		login: passport.authenticate('linkedin', {scope: ['r_basicprofile', 'r_emailaddress']}),
		callback: passport.authenticate('linkedin', {
			successRedirect: '/',
			failureRedirect: '/auth'
		}),
		connect: passport.authorize('linkedin', {scope: ['r_basicprofile','r_emailaddress']}),
		connectCallback: passport.authorize('linkedin', {
			successRedirect: '/',
			failureRedirect: '/'
		}),
		disconnect: function(req, res, next){
			var userid = req.user.id;
			
			User.findById(userid, function(err, user){
				
				for(var i = 0; i < user.socials.length; i++){
					if(user.socials[i].provider == 'linkedin'){
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
}