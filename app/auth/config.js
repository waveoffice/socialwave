	// config/config.js

module.exports = {
	facebook: {
		clientID: "1627176834230956",
		clientSecret: "9ce7645fc6328781112c3fb7564e220e",
		callbackURL: "http://localhost:3000/auth/facebook/callback",
		profileFields: ['id', 'displayName', 'photos', 'email'],
		passReqToCallback: true
	}, 
	twitter: {
		consumerKey: "iaaNVwPxpDNptT8efpZdd5yBj",
	    consumerSecret: "JnoP8eSRmLuTiSmEpJAtlED8bmY7hKteXVIT5tX0XfKCngjfDa",
	    callbackURL: "http://localhost:3000/auth/twitter/callback",
	    profileFields: ['id', 'displayName', 'photos', 'email'],
	    passReqToCallback: true
	},
	google: {
		clientID: "1037110977502-39957q6uba38n5ms640r43ud7nivae64.apps.googleusercontent.com",
		clientSecret: "Ag9dotoNywXvssdy_6xm6ok0",
		callbackURL: "http://localhost:3000/auth/google/callback",
		profileFields: ['id', 'displayName', 'photos', 'email'],
		passReqToCallback: true
	},
	github: {
		clientID: "850690614f8595f7d9e3",
		clientSecret: "f013864824a5688110938bb18c7b4a7c48ec7c58",
		callbackURL: "http://localhost:3000/auth/github/callback",
		profileFields: ['id', 'displayName', 'photos', 'email'],
		passReqToCallback: true
	},
	linkedin: {
		consumerKey: "77g70jb9moa30q",
		consumerSecret: "7CXxbfoX5YKuGwQL",
		callbackURL: "http://localhost:3000/auth/linkedin/callback",
		passReqToCallback: true
	}
};