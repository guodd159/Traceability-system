var path = require('path');
var express = require('express');
var router = express.Router();
var CanzModel = require('../models/canz');


var checkLogin = require('../middlewares/check').checkLogin;

// router.get('/canzs', function(req, res, next) {
//     var author = req.query.author;
//
//     CanzModel.getCanzs(author)
//         .then(function (canzs) {
//             res.render('czjgs', {
//                 canzs: canzs
//             });
//         })
//         .catch(next);
// });


router.get('/canzs', function (req, res, next) {
    var author = req.query.author;
    var page = parseInt(req.query.p) || 1;
    Promise.all([
        CanzModel.total(author),// 获取信息总数
        CanzModel.getCanzs(author, page)// 获取该页信息
    ])
        .then(function (result) {
            var num = result[0];
            var canzs = result[1];
            // if (!post) {
            //     throw new Error('该文章不存在');
            // }
            console.log(num);
            res.render('czjgs', {
                canzs: canzs,
                page: page,
                isFirstPage: (page - 1) == 0,
                isLastPage: ((page - 1) * 3 + canzs.length) == num
            });
        })
        .catch(next);

});

router.get('/', checkLogin, function (req, res, next) {
    res.render('cz');
});


router.post('/', checkLogin, function (req, res, next) {
    var cz = req.fields.cz;
    var cl = req.fields.cl;
    var bl = req.fields.bl;
    var cd = req.fields.cd;
    var cl1 = req.fields.cl1;
    var bl1 = req.fields.bl1;
    var cd1 = req.fields.cd1;
    var cl2 = req.fields.cl2;
    var bl2 = req.fields.bl2;
    var cd2 = req.fields.cd2;
    var cl3 = req.fields.cl3;
    var bl3 = req.fields.bl3;
    var cd3 = req.fields.cd3;
    var canz = {
        cz: cz,
        cl: cl,
        bl: bl,
        cd: cd,
        cl1: cl1,
        bl1: bl1,
        cd1: cd1,
        cl2: cl2,
        bl2: bl2,
        cd2: cd2,
        cl3: cl3,
        bl3: bl3,
        cd3: cd3
    };

    CanzModel.create(canz)
        .then(function (result) {
            canz = result.ops[0];
            // console.log(canz);
            req.flash('success', '成功');
            res.redirect(`/canz/${canz._id}`);
        })
        .catch(next);
});
router.get('/search', function (req, res, next) {
    var czId = req.query.czId;


    CanzModel.search(czId)
        .then(function (canz) {
            // var canz = result[0];
            // // console.log(canz);
            if (!canz) {
                throw new Error('该信息不存在');
            }
            res.render('czjg', {
                canz: canz
            });
        })
        .catch(next);
});
router.get('/:canzId', function (req, res, next) {
    var canzId = req.params.canzId;
    // var cz = req.fields.cz;

    Promise.all([
        CanzModel.getCanzById(canzId)
    ])
        .then(function (result) {
            var canz = result[0];
            // console.log(canz);
            if (!canz) {
                throw new Error('不存在');
            }
            res.render('czjg', {
                canz: canz

            });
        })
        .catch(next);
});



module.exports = router;