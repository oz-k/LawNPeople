const router = require('express').Router();

router.get('/', function(req, res) {
    res.render('main/main.html', {});
});

module.exports = router;