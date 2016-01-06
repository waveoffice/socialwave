	// config/config.js

module.exports = {
	facebook: {
		clientID: "***********************",
		clientSecret: "*****************************",
		callbackURL: "http://localhost:3000/auth/facebook/callback",
		profileFields: ['id', 'displayName', 'photos', 'email'],
		passReqToCallback: true
	}, 
	twitter: {
		consumerKey: "***********************",
	    consumerSecret: "***********************",
	    callbackURL: "http://localhost:3000/auth/twitter/callback",
	    profileFields: ['id', 'displayName', 'photos', 'email'],
	    passReqToCallback: true
	},
	google: {
		clientID: "***********************",
		clientSecret: "***********************",
		callbackURL: "http://localhost:3000/auth/google/callback",
		profileFields: ['id', 'displayName', 'photos', 'email'],
		passReqToCallback: true
	},
	github: {
		clientID: "***********************",
		clientSecret: "***********************",
		callbackURL: "http://localhost:3000/auth/github/callback",
		profileFields: ['id', 'displayName', 'photos', 'email'],
		passReqToCallback: true
	},
	linkedin: {
		consumerKey: "***********************",
		consumerSecret: "***********************",
		callbackURL: "http://localhost:3000/auth/linkedin/callback",
		passReqToCallback: true
	}
};
