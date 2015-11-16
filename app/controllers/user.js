// app/controllers/contato.js
module.exports = function(app){
	
	var controller = {};
	var User = app.models.user;
	
	controller.index = function(req, res){
		var user = req.user;
		res.json('users', {'user': user})
	}

	return controller;
};