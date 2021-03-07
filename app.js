const express = require('express');
const app = express();
const session = require('express-session');
const nunjucks = require('nunjucks');
const flash = require('connect-flash')

app.use(express.static(__dirname+'/views/template'));
app.use(express.static(__dirname+'/views/board'));
app.use(express.static(__dirname+'/views/home'));
app.use(express.static(__dirname+'/views/join'));
app.use(express.static(__dirname+'/views/login'));
app.use(express.static(__dirname+'/views/user'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(flash());

const passport = require('passport');
require('./passport/index')();

app.use(session({cookie:{maxAge:60000},
    secret:'secret',
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(flash());
app.use(session({cookie:{maxAge:60000},
    secret:'secret',
    resave:false,
    saveUninitialized:false
}));

nunjucks.configure('views', {
    autoescape:true,
    express:app
});

require('./models/index')();

const homeRouter = require('./routes/home');
app.get('/', homeRouter);

const loginRouter = require('./routes/login');
app.get('/login', loginRouter);
app.post('/auth', loginRouter);

const joinRouter = require('./routes/join');
app.get('/join', joinRouter);
app.post('/join-confirm', joinRouter);

const userRouter = require('./routes/user');
app.get('/user', userRouter);

const boardRouter = require('./routes/board');
app.get('/board', boardRouter);
app.get('/board/view', boardRouter);
app.get('/board/write', boardRouter);
app.post('/board/write-confirm', boardRouter);
app.get('/board/modify', boardRouter);
app.post('/board/modify-confirm', boardRouter);
app.get('/board/delete', boardRouter);

const ajaxRouter = require('./routes/ajax');
app.post('/ajax', ajaxRouter);

app.listen(80, function() {
    console.log('start server');
})