// app/routes/posts.js
var verificaAutenticacao = require('../middlewares/verificaAutenticacao');

	module.exports = function(app){
		var controller = app.controllers.posts;

		app.route('/posts')
			.get(verificaAutenticacao, controller.index)
			.post(verificaAutenticacao, controller.create);
		//app.post('/posts', verificaAutenticacao, controller.update);

		app.route('/posts/:id')
			.get(verificaAutenticacao, controller.show)
			.delete(verificaAutenticacao, controller.destroy);
		

		app.get('/posts/favoritos/:id', verificaAutenticacao, controller.favorite);
		
	};