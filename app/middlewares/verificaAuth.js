	module.exports = function verificaAuth(req, res, next) {
		if (req.isAuthenticated()) {
			res.redirect('/');
		} else {
			return next();
		}
	}	