const router = require('express').Router();

router.post('/ajax', function(req, res) {
    let data = req.body.id;
    console.log(data);
    
    if(data) {
        res.send({result:true});
    } else {
        res.send({result:flase});
    }
})

module.exports = router;