const router = require('express').Router();

router.get('/user', function(req, res) {
    if(req.isAuthenticated()) {
        let userModel = require('../models/user');
        let boardModel = require('../models/board');

        userModel.findOne({id:req.session.passport.user}, function(err, user) {
            if(err) console.log(err);
            else {
                boardModel.find({writer:user.id}, function(err, boards) {
                    if(err) console.log(err);
                    else {
                        res.render('user/user.html', {
                            userInfo : {
                                name:user.name,
                                age:user.age,
                                email:user.email
                            },
                            board : boards
                        })
                    }
                });
            }
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;