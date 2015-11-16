// app/controllers/posts.js
module.exports = function(app){
	
	var controller = {};
	var User = require('../models/user');

	controller.index = function(req, res){
		var _id = req.user._id;
		var arrSocial = [];
		User.findById(_id, function(err, user){

			user.socials.forEach(function(social){
				if(social.provider == "facebook"){
					arrSocial.push('facebook');
				}else if(social.provider == "twitter"){
					arrSocial.push('twitter');
				}else if(social.provider == "google"){
					arrSocial.push('google');
				}else if(social.provider == "linkedin"){
					arrSocial.push('linkedin');
				}
			});

			var posts = user.posts.reverse();
			//posts ? res.render('posts', {posts: posts, user: user, social: arrSocial}) : res.status(404).send('Não há postagens deste usuário.');
			res.json(posts);
		});
	},

	controller.show = function(req, res){
		var _id = req.user._id;
		console.log(req.params.id);	
		User.findById(_id, function(err, user){
			var postID = req.params.id;
			var post = user.posts.id(postID);
			var result = {post: post};

			post ? res.json(result) : res.status(404).send('Post não encontrado.');

		});

	},

	controller.create = function(req, res){
		var _id = req.user._id;
		
		User.findById(_id, function(err, user){
		
			var postagem = {
				photo: user.photo,
				username: user.username,
				content: req.body.content
			};

			user.posts.push(postagem);
			
			user.save(function(){
				res.redirect('/posts');
			});
		});
	},

	controller.edit = function(req, res){},

	controller.update = function(req, res){},

	controller.destroy = function(req, res){
		var _id = req.user._id;

		User.findById(_id, function(err, user){
			if(err) throw err;
				
				var postid = req.params.id;
				user.posts.id(postid).remove();

				user.save(function(err){
					console.log(err);
				});
		});
	},

	controller.favorite = function(req, res){
		var postid = req.params.id;
		var userid = req.user._id;

		User.findById(userid, function(err, user){
			var postagem = user.posts.id(postid);
			
			user.favorites.push(postagem);

			user.save(function(){
				res.redirect('/posts');
			});
		});
	}

	return controller;
};