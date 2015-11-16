// app/routes/ondas.js
var verificaAutenticacao = require('../middlewares/verificaAutenticacao');

	module.exports = function(app){
		var controller = app.controllers.ondas;

		app.get('/ondas', verificaAutenticacao, controller.index);
		app.post('/ondas', verificaAutenticacao, controller.OndaCreate);
		
	};