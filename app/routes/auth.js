// app/routes/auth.js

var verificaAuth = require('../middlewares/verificaAuth');

	module.exports = function(app){
		var controller = app.controllers.auth;
		
		var strategySocialwave = app.strategy.socialwave;
		var strategyFacebook = app.strategy.facebook;
		var strategyTwitter = app.strategy.twitter;
		var strategyGoogle = app.strategy.google;
		var strategyLinkedin = app.strategy.linkedin;
		var strategyGithub = app.strategy.github;

		app.get('/auth', verificaAuth, controller.formLogin);
		app.post('/auth', strategySocialwave.local.login);

		app.get('/register', verificaAuth, controller.formRegister);
		app.post('/register', strategySocialwave.local.register);
		
		app.get('/lostpass', verificaAuth, controller.formLostpass);
		app.post('/lostpass', controller.lostpass);
		
		app.get('/logout', controller.logout);

		// ################################## ROTAS DO FACEBOOK PARA LOGAR E CONECTAR A REDE SOCIAL
		
		app.get('/auth/facebook', strategyFacebook.facebook.login);
		app.get('/auth/facebook/callback', strategyFacebook.facebook.callback);
		
		app.get('/connect/facebook', strategyFacebook.facebook.connect);
		app.get('/connect/facebook/callback', strategyFacebook.facebook.connectCallback);
		app.get("/disconnect/facebook", strategyFacebook.facebook.disconnect, function(req, res){
			res.redirect('/');
		});

		// FIM DA ROTA DO FACEBOOK #################################################################

		// ################################## ROTAS DO TWITTER PARA LOGAR E CONECTAR A REDE SOCIAL
		
		app.get('/auth/twitter', strategyTwitter.twitter.login);
		app.get('/auth/twitter/callback', strategyTwitter.twitter.callback);
		
		app.get('/connect/twitter', strategyTwitter.twitter.connect);
		app.get('/connect/twitter/callback', strategyTwitter.twitter.connectCallback);
		app.get("/disconnect/twitter", strategyTwitter.twitter.disconnect, function(req, res){
			res.redirect('/');
		});

		// FIM DA ROTA DO TWITTER ##################################################################

		// ################################## ROTAS DO GOOGLE PARA LOGAR E CONECTAR A REDE SOCIAL
		
		app.get('/auth/google', strategyGoogle.google.login);
		app.get('/auth/google/callback', strategyGoogle.google.callback);
		
		app.get('/connect/google', strategyGoogle.google.connect);
		app.get('/connect/google/callback', strategyGoogle.google.connectCallback);
		app.get("/disconnect/google", strategyGoogle.google.disconnect, function(req, res){
			res.redirect('/');
		});

		// FIM DA ROTA DO GOOGLE ##################################################################

		// ################################## ROTAS DO LINKEDIN PARA LOGAR E CONECTAR A REDE SOCIAL
		
		app.get('/auth/linkedin', strategyLinkedin.linkedin.login);
		app.get('/auth/linkedin/callback', strategyLinkedin.linkedin.callback);
		
		app.get('/connect/linkedin', strategyLinkedin.linkedin.connect);
		app.get('/connect/linkedin/callback', strategyLinkedin.linkedin.connectCallback);
		app.get("/disconnect/linkedin", strategyLinkedin.linkedin.disconnect, function(req, res){
			res.redirect('/');
		});

		// FIM DA ROTA DO LINKEDIN ##################################################################

		// ################################## ROTAS DO GITHUB PARA LOGAR E CONECTAR A REDE SOCIAL
		
		app.get('/auth/github', strategyGithub.github.login);
		app.get('/auth/github/callback', strategyGithub.github.callback);
		
		app.get('/connect/github', strategyGithub.github.connect);
		app.get('/connect/github/callback', strategyGithub.github.connectCallback);
		app.get("/disconnect/github", strategyGithub.github.disconnect, function(req, res){
			res.redirect('/');
		});

		// FIM DA ROTA DO GITHUB ##################################################################
				
	};