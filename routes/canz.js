var path = require('path');
var express = require('express');
var router = express.Router();
var CanzModel = require('../models/canz');


var checkLogin = require('../middlewares/check').checkLogin;



router.get('/', checkLogin, function(req, res, next) {
    res.render('cz');
});


router.post('/', checkLogin, function(req, res, next) {

    var cl = req.fields.cl;
    var bl = req.fields.bl;
    var cd = req.fields.cd;


    var canz = {

        cl: cl,
        bl: bl,
        cd: cd
    };

    CanzModel.create(canz)
        .then(function (result) {

            canz = result.ops[0];
            console.log(canz);


            req.flash('success', '成功');

            res.redirect(`/canz/${canz._id}`);
        })
        .catch(next);
});

router.get('/:canzId', function(req, res, next) {
    var canzId = req.params.canzId;

    Promise.all([
        CanzModel.getCanzById(canzId)

    ])
        .then(function (result) {
            var canz = result[0];

            if (!canz) {
                throw new Error('该xinxi不存在');
            }

            res.render('czjg', {
                canz: canz

            });
        })
        .catch(next);
});

module.exports=router;