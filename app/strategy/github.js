var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var User = require('../models/user');
var config = require('../auth/config');

var githubInit = function(req, token, tokenSecret, profile, callback){
	User.findOne({'github.id': profile.id}, function(err, existingUser){
		if(err){
			return callback(err);
		}

		if(existingUser){
			return callback(null, existingUser);
		}

		var user = (req.user) ? req.user : new User();

		user.github.id = profile.id;
		user.github.username = profile.displayName;
		user.github.token = token;

		user.save(function(err){
			if(err){
				throw err;
			}

			return callback(null, user);	
		});
	});
};

passport.use(new GitHubStrategy(config.github, githubInit));

passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	User.findById(id, function(err, user){
		callback(err, user);
	});
});

module.exports = {
	github: {
		login: passport.authenticate('github', {scope: ['email']}),
		callback: passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/auth'
		}),
		connect: passport.authorize('github', {scope: ['email']}),
		connectCallback: passport.authorize('github', {
			successRedirect: '/',
			failureRedirect: '/'
		}),
		disconnect: function(req, res, next){
			var user = req.user;
			
			user.github.id = undefined;
			user.github.token = undefined;
			user.github.username = undefined;

			user.save(function(err){
				next();
			});
		}
	}
};