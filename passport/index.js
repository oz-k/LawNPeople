const passport = require('passport');
const mongoose = require('mongoose');
const local = require('./local');

module.exports = function() {
    passport.serializeUser(function(userId, done) {
        done(null, userId);
    });

    passport.deserializeUser(function(userId, done) {
        let userModel = mongoose.model('user');
        userModel.findOne({id:userId}, function(err, user) {
            if(err) console.log(err);
            else done(null, user);
        })
    })

    local(passport);
}