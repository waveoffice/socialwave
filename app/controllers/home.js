// app/controllers/home.js

module.exports = function(app){
	var controller = {};
	
	controller.index = function(req, res){
		var user = req.user;
		
		user ? res.json(user) : res.status(404).send('Usuário não encontrado.');
	}
	
	return controller;
}