const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use('local', new localStrategy({
        usernameField:'id',
        passwordField:'pw'
    }, function(id, pw, done) {
        const userModel = require('../models/user');
        userModel.findOne({id:id}, async function(err, user) {
            if(err) console.log(err);
            if(user != null && await require('../resources/hash').comp(pw, user.pw)) {
                return done(null, {'user':user.id});
            }
            return done(null, false, {msg:'mismatch'});
        })
    })
)}