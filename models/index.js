module.exports = function() {
    const mongoose = require('mongoose');
    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function() {
        console.log('Connected to mongod server');
    });
    mongoose.connect("mongodb://localhost:27017/LawNPeople");
}

