// app/controllers/ondas.js

module.exports = function(){
	var controller = {};

	controller.index = function(req, res){
		var user = req.user;
		res.render('ondas', {'user': user});
	},

	controller.OndaCreate = function(req, res){
		
	}
	
	return controller;
}