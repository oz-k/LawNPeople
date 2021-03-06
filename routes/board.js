const board = require('../models/board');

const router = require('express').Router();

router.get('/board', function(req, res) {
    let boardModel = require('../models/board');
    boardModel.find({}, function(err, boards) {
        if(err) console.log(err);
        else {
            res.render('board/boardMain.html', {boards:boards});
        }
    })
});

router.get('/board/:boardNo', function(req, res) {
    let boardModel = require('../models/board');
    boardModel.findOne({boardNo:req.params.boardNo}, function(err, board) {
        if(err) console.log(err);
        else {
            if(board) {
                res.render('board/board.html', {board:board, writer:})
            } else {
                res.send('존재하지않는 게시글');
            }
        }
    })
});

router.get('/board/write', function(req, res) {
    if(req.isAuthenticated()) {
        res.render('board/write.html', {});
    } else {
        res.redirect('/board');
    }
});

router.post('/board/write-confirm', function(req, res) {
    const boardModel = require('../models/board');
    new boardModel({
        title:req.body.title,
        contents:req.body.contents,
        writer:req.session.passport.user
    }).save();
    console.log('boardNo', board.boardNo);
    res.redirect('/board/:'+ board.boardNo);//나중에 바꿔야함
})

router.get('/board/modify/:boardNo', function(req, res) {
    if(req.isAuthenticated()) {
        const boardModel = require('../models/board');
        boardModel.findOne({boardNo:req.params.boardNo}, function(err, board) {
            if(err) console.log(err);
            else if(board.writer === req.session.passport.user) {
                res.render('board/modify.html', {
                    board:board
                });
            } else {
                res.send('수정 권한 없음');
            }
        })
    } else {
        res.redirect('/board');
    }
});

router.post('/board/modify-confirm/:boardNo', function(req, res) {
    if(req.isAuthenticated()) {
        let params = req.params;
        let userId = req.session.passport.user;
        const boardModel = require('../models/board');
        boardModel.findOne({boardNo:params.boardNo}, function(err, board) {
            if(err) console.log(err);
            else if(board.writer === userId) {
                boardModel.updateOne({boardNo:board.boardNo}, {title:params.title, contents:params.contents}, function(err) {
                    if(err) console.log(err);
                    else res.redirect('/board/'+params.boardNo);
                })
            }
        })
    }
});

router.get('/board/delete/:boardNo', function(req, res) {
    let params = req.params;
    let userId = req.session.passport.user;
    const boardModel = require('../models/board');
    boardModel.findOne({boardNo:params.boardNo}, function(err, board) {
        if(err) console.log(err);
        else if(board.writer === userId) {
            boardModel.deleteOne({boardNo:board.boardNo}, function(err) {
                if(err) console.log(err);
                else res.redirect('/board');
            })
        }
    })
})

module.exports = router;