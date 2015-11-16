// app/controllers/favoritos.js

module.exports = function(){
	var controller = {};
	var User = require('../models/user');

	controller.index = function(req, res){
		var user = req.user;
		var favorites = req.user.favorites.reverse();
		
		res.render('favoritos', {'user': user, 'favorites': favorites});
	},

	controller.destroy = function(req, res){
		var favoriteid = req.params.id;
		var userid = req.user._id;

		User.findById(userid, function(err, user){
			user.favorites.id(favoriteid).remove();
			
			user.save(function(){
				res.redirect('/favoritos');
			});
		});
	}
	
	return controller;
}