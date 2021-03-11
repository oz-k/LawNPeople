const router = require('express').Router();

router.get('/join', function(req, res) { //회원가입창
    if(req.session.userData) {
        res.render('join/join.html', {
            id:req.session.userData.id, 
            pw:req.session.userData.pw,
            email:req.session.userData.email,
            name:req.session.userData.name,
            age:req.session.userData.age  
        });
        req.session.userData = null;
    } else {
        res.render('join/join.html', {})
    }
})

router.post('/join-confirm', function(req, res) { //회원가입 로직
    let userModel = require('../models/user');
    userModel.findOne({id:req.body.id}, function(err, user) {
        if(err) {
            console.log(err);
        } else if(!user) {
            require('../resources/hash').hashing(req.body.pw).then(function(pw) {
                new userModel({
                    id:req.body.id,
                    pw:pw,
                    name:req.body.name,
                    age:req.body.age,
                    email:req.body.email
                }).save();
                res.redirect('/');
            });
        } else {
            req.session.userData = {
                id : req.body.id,
                pw : req.body.pw,
                email : req.body.email,
                name : req.body.name,
                age : req.body.age,
            }
            res.redirect('/join')
        }
    })
})

module.exports = router;