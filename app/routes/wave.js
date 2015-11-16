// app/routes/wave.js
var verificaAutenticacao = require('../middlewares/verificaAutenticacao');

	module.exports = function(app){
		var controller = app.controllers.wave;

		app.get('/wave', verificaAutenticacao, controller.index);
		
	};