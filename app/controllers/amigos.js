// app/controllers/amigos.js

module.exports = function(){
	var controller = {};

	controller.index = function(req, res){
		var user = req.user;
		res.render('amigos', {'user': user});
	}
	
	return controller;
}