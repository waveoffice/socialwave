var mongoose = require('mongoose');

module.exports = {
	connect: function(){
		mongoose.connect('mongodb://localhost/socialwave');
	}
};