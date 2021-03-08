const router = require('express').Router();
const userModel = require('../models/user');

router.post('/ajax', function(req, res) {
    let id = req.body.id;
    userModel.findOne({id:id}, function(err, result) {
        if(err) console.log(err);
        else if(result) {
            res.send({result:false});
        } else {
            res.send({result:true});
        }
    })
})

module.exports = router;