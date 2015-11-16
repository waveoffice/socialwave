// app/controllers/wave.js

module.exports = function(){
	var controller = {};

	controller.index = function(req, res){
		var user = req.user;
		res.render('wave', {'user': user});
	}
	
	return controller;
}