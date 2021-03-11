const router = require('express').Router();
const boardModel = require('../models/board');

router.get('/board', function(req, res) { //게시판 메인화면
    let boardModel = require('../models/board');
    boardModel.find({}, function(err, boards) {
        if(err) console.log(err);
        else {
            res.render('board/board.html', {boards:boards});
        }
    })
});

router.get('/board/view', function(req, res) { //게시글화면
    let boardNo = req.query.boardNo;
    let boardModel = require('../models/board');
    boardModel.findOne({boardNo:boardNo}, function(err, board) {
        if(err) console.log(err);
        else {
            if(board) {
                let writer;
                if(req.isAuthenticated() && req.session.passport.user === board.writer)
                    writer = true;
                else 
                    writer = false;
                    
                res.render('board/view.html', {board:board, writer:writer});
            } else {
                res.send('존재하지않는 게시글');
            }
        }
    })
});

router.get('/board/write', function(req, res) { //게시글 작성화면
    if(req.isAuthenticated()) {
        res.render('board/write.html', {});
    } else {
        res.redirect('/login');
    }
});

router.post('/board/write-confirm', function(req, res) { //게시글 작성로직
    new boardModel({
        title:req.body.title,
        contents:req.body.contents,
        writer: req.session.passport.user
    }).save().then(function(result) {
        res.redirect('/board/view?boardNo='+ result.boardNo);
    });
})

router.get('/board/modify', function(req, res) { //게시글 수정화면
    let boardNo = parseInt(req.query.boardNo);
    if(boardNo) {
        if(req.isAuthenticated()) {
            boardModel.findOne({boardNo:boardNo}, function(err, board) {
                if(err) console.log(err);
                else if(board.writer == req.session.passport.user) {
                    res.render('board/modify.html', {
                        board:board
                    });
                } else {
                    res.send('수정권한 없음')
                }
            })
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/board');
    }
});

router.post('/board/modify-confirm', function(req, res) { //게시글 수정로직
    if(req.isAuthenticated()) {
        let params = req.body;
        let userId = req.session.passport.user;
        boardModel.findOne({boardNo:params.boardNo}, function(err, board) {
            if(err) console.log(err);
            else if(board.writer == userId) {
                boardModel.updateOne({boardNo:board.boardNo}, {title:params.title, contents:params.contents}, function(err) {
                    if(err) console.log(err);
                    else res.redirect('/board/view?boardNo='+params.boardNo);
                })
            } else {
                res.send('수정권한 없음');
            }
        })
    } else {
        res.redirect('/login')
    }
});

router.get('/board/delete', function(req, res) { //게시글 삭제로직
    if(req.isAuthenticated()) {
        let boardNo = parseInt(req.query.boardNo);
        let userId = req.session.passport.user;
        boardModel.findOne({boardNo:boardNo}, function(err, board) {
            if(err) console.log(err);
            else if(board.writer == userId) {
                boardModel.deleteOne({boardNo:boardNo}, function(err) {
                    if(err) console.log(err);
                    else res.redirect('/board');
                });
            } else {
                res.send('삭제권한 없음');
            }
        })
    } else {
        res.redirect('/login');
    }
})

module.exports = router;