	// app/routes/home.js
var verificaAutenticacao = require('../middlewares/verificaAutenticacao');

	module.exports = function(app){
		var controller = app.controllers.home;

		app.get('/', verificaAutenticacao, controller.index);
	};