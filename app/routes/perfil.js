// app/routes/perfil.js
var verificaAutenticacao = require('../middlewares/verificaAutenticacao');

	module.exports = function(app){
		var controller = app.controllers.perfil;

		app.get('/perfil', verificaAutenticacao, controller.index);
		app.post('/perfil', verificaAutenticacao, controller.PerfilCreate);
		
	};