// app/routes/favoritos.js
var verificaAutenticacao = require('../middlewares/verificaAutenticacao');

	module.exports = function(app){
		var controller = app.controllers.favoritos;

		app.get('/favoritos', verificaAutenticacao, controller.index);

		app.get('/favoritos/delete/:id', verificaAutenticacao, controller.destroy);
		
	};