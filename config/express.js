// config/express.js

// CARREGANDO OS MÓDULOS PARA O FUNCIONAMENTO DA APLICAÇÃO
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
//var GitHubStrategy = require('passport-github2').Strategy;
var flash = require('connect-flash');
var error = require('../app/middlewares/error');

// CARREGANDO O MÓDULO DE CONEXÃO COM O BANCO DE DADOS
var database = require('./database');

// EXPORTANDO AS CONFIGURAÇÕES DO EXPRESS COMO MÓDULO
module.exports = function(){
	var app = express();

	// CONFIGURANDO VARIAVEIS DE AMBIENTE
	app.set('port', 3000);


	// CONFIGURANDO OS MIDDLEWARES DA APLICAÇÃO
	app.use(express.static('./public'));

	// CONFIGURANDO A TEMPLATE ENGINE, ATRAVÉS DAS VARIÁVEIS DE AMBIENTE
	app.set('view engine','ejs');
	app.set('views', './app/views');

	// CONFIGURANDO O FAVICON
	app.use(favicon('./public/images/favicon.ico'));

	//
	app.use(logger('dev'));
	
	// CONFIGURANDO OS MIDDLEWARES PARA O FUNCIONAMENTO DOS METHODS PUT DELETE
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(require('method-override')(function(req, res){
	  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
	    var method = req.body._method
	    delete req.body._method
	    return method
	  }
	}));

	// CONFIGURANDO A SESSÃO E O PASSPORT
	app.use(session({
	  secret: "socialwavekey",
	  resave: true,
	  saveUninitialized: true
	}));

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	// CRIANDO UMA INSTANCIA DO BANCO DE DADOS
	database.connect();

	// CARREGANDO OS MODELS, CONTROLLERS E ROUTES AUTOMAGICAMENTE	
	consign({cwd: 'app'})
		.include('models')
		.then('strategy')
		.then('controllers')
		.then('routes')
		.into(app);

	app.use(error.notFound);
	//app.use(error.serverError);
	
	return app;
};