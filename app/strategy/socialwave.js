var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


var localRegisterInit = function(req, email, password, callback){
	User.findOne( { "email" : email }, function(err, existingUser){
		if(err){
			return callback(err);
		}

		if(existingUser){
			return callback(null, false, req.flash('registerMessage', 'Este e-mail já está cadastrado. Para alterar sua senha, acesse seu email de cadastro e clique no link de redefinição de senha.'));
		}

		var user = (req.user) ? req.user : new User();
		
		user.username = req.body.username;
		user.email = email;
		user.password = user.hashPassword(password);
		user.photo = "http://localhost:3000/images/avatar-dhg.jpg";

		user.save(function(err){
			if(err){
				throw err;
			}

			return callback(null, user);
		});

	});
};

var localLoginInit = function(req, email, password, callback){
	User.findOne({ "email": email }, function(err, user){
		if(err){
			return callback(err);
		}

		if(user.email === email){
			return callback(null, false, req.flash('loginMessage', 'Talvez você tenha utilizado o facebook ou google para entar no Socialwave, pois seu email está cadastrado, mas não consta uma senha. Lhe enviamos um email para que você cadastre uma senha.'));
		
		}else if(!user || !user.validatePassword(password)){
			return callback(null, false, req.flash('loginMessage', 'Usuário e/ou Senha inválido(s)!'));
		
		}

		return callback(null, user);

	});
};

var localOptions = {
	usernameField: "email",
	passReqToCallback: true
};

passport.use('local-register', new LocalStrategy(localOptions, localRegisterInit));
passport.use('local-login', new LocalStrategy(localOptions, localLoginInit));

passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	User.findById(id, function(err, user){
		callback(err, user);
	});
});

module.exports = {
	local: {
		register: passport.authenticate('local-register', {
			successRedirect: '/',
			failureRedirect: '/register',
			failureFlash: true
		}),
		connect: passport.authenticate('local-register', {
			successRedirect: '/', 
			failureRedirect: '/'
		}),
		login: passport.authenticate('local-login', {
			successRedirect: '/', 
			failureRedirect: '/auth',
			failureFlash: true
		}),
		disconnect: function(req, res, next){
			var user = req.user;
			
			user.email = undefined;
			user.password = undefined;
			user.username = undefined;

			user.save(function(err){
				next();
			});
		}
	}
};