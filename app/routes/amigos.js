// app/routes/amigos.js
var verificaAutenticacao = require('../middlewares/verificaAutenticacao');

	module.exports = function(app){
		var controller = app.controllers.amigos;

		app.get('/amigos', verificaAutenticacao, controller.index);
		
	};