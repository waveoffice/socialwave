// app/controllers/perfil.js

module.exports = function(app){
	var controller = {};
	var Perfil = app.models.perfil;


	controller.index = function(req, res){
		var user = req.user;
		res.render('perfil', {'user': user});
	},
	controller.PerfilCreate = function(req, res){
		var id = req.user._id;
		var dados = req.body;
		Perfil.findOrCreate(id, { user_id: id, username: dados.username, useremail: dados.useremail, about: dados.about }, function (err, perfil) {
		  if (err) return console.log(err);
		  	console.log(perfil);
		  	res.redirect('/perfil', {perfil: perfil});
		});
	},
	controller.PerfilUpdate = function(req, res){
		var id = req.user.local.id;
		var dados = req.body;
		Perfil.findByIdAndUpdate(id, { $set: { user_id: id, username: dados.username, useremail: dados.useremail, about: dados.abaut }}, function (err, perfil) {
		  if (err) return handleError(err);
		  	console.log(perfil);
		  	res.redirect('/perfil');
		});
	}
	
	return controller;
}