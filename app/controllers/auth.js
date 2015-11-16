// app/controllers/auth.js

module.exports = function(app){
	var controller = {};

	controller.formLogin = function(req, res){
		res.render('login', {message: req.flash('loginMessage')});		
	},

	controller.login = function(req, res){
		res.send('Logar no sistema');
	},

	controller.formRegister = function(req, res){
			res.render('register', {message: req.flash('registerMessage')});
	},

	controller.register = function(req, res){
		res.send('Cadastro no Banco');
	},

	controller.logout = function(req, res){
			req.logout();
			res.redirect('/');
	},

	controller.formLostpass = function(req, res){
		res.render('lostpass');
	},

	controller.lostpass = function(req, res){
		res.send('Email Enviado');
	}
	
	return controller;
}