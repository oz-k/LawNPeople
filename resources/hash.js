const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.hashing = function(pw) {
    //promise
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) console.log(err);
            bcrypt.hash(pw, salt, function(err, hash) {
                if(err) console.log(err);
                resolve(hash);
            });
        });
    });
}
module.exports.comp = function(pw, hash) {
    //promise
    return new Promise(function(resolve, reject) {
        bcrypt.compare(pw, hash, function(err, result) {
            if(err) console.log(err);
            resolve(result);
        });
    });
}