const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use('local', new localStrategy({
        usernameField:'id',
        passwordField:'pw'
    }, function(id, pw, done) {
        const userModel = require('../models/user');
        userModel.findOne({id:id, pw:pw}, function(err, user) {
            if(err) console.log(err);
            if(user != null) {
                return done(null, {'user':user.id});
            }
            return done(null, false, {msg:'mismatch'});
        })
    })
)}