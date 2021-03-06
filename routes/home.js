const router = require('express').Router();

router.get('/', function(req, res) {
    res.render('home/home.html', {});
});

module.exports = router;