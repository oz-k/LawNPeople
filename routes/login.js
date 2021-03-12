const router = require('express').Router();
const passport = require('passport');

router.get('/login', function(req, res) { //로그인화면
    let temp = req.flash();
    // let msg = temp.msg;
    // if(msg) {
    //     if(msg[0] == 'idnull')
    //         msg = '아이디가 입력되지 않았습니다.';
    //     else if(msg[0] == 'pwnull')
    //         msg = '비밀번호가 입력되지 않았습니다.';
    //     else
    //         msg = '아이디가 존재하지 않거나 잘못된 비밀번호입니다.';
    // }
    res.render('login/login.html', {
        id:temp.id,
        msg:temp.msg
    })
})

router.post('/auth', function(req, res, next) { //로그인로직
    req.flash('id', req.body.id);

    passport.authenticate('local', function(err, user, msg) {
        if(err) return next(err);
        loginCheck(user.user, msg);
    })(req, res, next);

    function loginCheck(userId, msg) { //유저정보 있는지 확인
        if(msg) {
            req.flash('msg', msg.msg);
            return res.redirect('/login');
        }
        req.logIn(userId, function(err) {
            if(err) return next(err);
            req.flash();
            return res.redirect('/');
        })
    }
});

module.exports = router;